import { Injectable } from '@angular/core';

export interface Category {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  categoryId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private categories: Category[] = [];
  private nextTaskId = 1;
  private nextCategoryId = 1;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.nextTaskId =
        this.tasks.length > 0
          ? Math.max(...this.tasks.map((t) => t.id)) + 1
          : 1;
    }

    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
      this.nextCategoryId =
        this.categories.length > 0
          ? Math.max(...this.categories.map((c) => c.id)) + 1
          : 1;
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string, categoryId?: number) {
    const newTask: Task = {
      id: this.nextTaskId++,
      title: title.trim(),
      completed: false,
      categoryId,
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  updateTask(taskToUpdate: Task) {
    const index = this.tasks.findIndex((t) => t.id === taskToUpdate.id);
    if (index > -1) {
      this.tasks[index] = taskToUpdate;
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryName(id: number): string {
    const category = this.categories.find((c) => c.id === id);
    return category ? category.name : 'Sin categoría';
  }

  addCategory(name: string) {
    if (!name || name.trim().length === 0) return;

    const newCategory: Category = {
      id: this.nextCategoryId++,
      name: name.trim(),
    };
    this.categories.push(newCategory);
    this.saveCategories();
  }

  updateCategory(categoryToUpdate: Category) {
    const index = this.categories.findIndex(
      (c) => c.id === categoryToUpdate.id
    );
    if (index > -1) {
      this.categories[index] = categoryToUpdate;
      this.saveCategories();
    }
  }

  deleteCategory(id: number) {
    this.tasks.forEach((task) => {
      if (task.categoryId === id) {
        delete task.categoryId;
      }
    });
    this.saveTasks();

    this.categories = this.categories.filter((c) => c.id !== id);
    this.saveCategories();
  }
}
