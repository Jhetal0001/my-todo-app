import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private readonly _tasks = new BehaviorSubject<Task[]>([]);
  private readonly _categories = new BehaviorSubject<Category[]>([]);

  readonly tasks$ = this._tasks.asObservable();
  readonly categories$ = this._categories.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this._tasks.next(JSON.parse(storedTasks));
      }

      const storedCategories = localStorage.getItem('categories');
      if (storedCategories) {
        this._categories.next(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error('Error al cargar datos desde localStorage', error);
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks.getValue()));
  }

  private saveCategories() {
    localStorage.setItem(
      'categories',
      JSON.stringify(this._categories.getValue())
    );
  }

  addTask(title: string, categoryId?: number) {
    const currentTasks = this._tasks.getValue();
    const nextTaskId =
      currentTasks.length > 0
        ? Math.max(...currentTasks.map((t) => t.id)) + 1
        : 1;

    const newTask: Task = {
      id: nextTaskId,
      title: title.trim(),
      completed: false,
      categoryId,
    };

    this._tasks.next([...currentTasks, newTask]);
    this.saveTasks();
  }

  updateTask(taskToUpdate: Task) {
    const currentTasks = this._tasks.getValue();
    const updatedTasks = currentTasks.map((t) =>
      t.id === taskToUpdate.id ? taskToUpdate : t
    );

    this._tasks.next(updatedTasks);
    this.saveTasks();
  }

  deleteTask(id: number) {
    const currentTasks = this._tasks.getValue();
    const updatedTasks = currentTasks.filter((task) => task.id !== id);

    this._tasks.next(updatedTasks);
    this.saveTasks();
  }

  getCategoryName(id: number): string {
    const category = this._categories.getValue().find((c) => c.id === id);
    return category ? category.name : 'Sin categoría';
  }

  addCategory(name: string) {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const currentCategories = this._categories.getValue();
    const nextCategoryId =
      currentCategories.length > 0
        ? Math.max(...currentCategories.map((c) => c.id)) + 1
        : 1;

    const newCategory: Category = { id: nextCategoryId, name: trimmedName };

    this._categories.next([...currentCategories, newCategory]);
    this.saveCategories();
  }

  updateCategory(categoryToUpdate: Category) {
    const currentCategories = this._categories.getValue();
    const updatedCategories = currentCategories.map((c) =>
      c.id === categoryToUpdate.id ? categoryToUpdate : c
    );

    this._categories.next(updatedCategories);
    this.saveCategories();
  }

  deleteCategory(id: number) {
    const currentTasks = this._tasks.getValue();
    const tasksToUpdate = currentTasks.map((task) => {
      if (task.categoryId === id) {
        const { categoryId, ...rest } = task;
        return rest;
      }
      return task;
    });
    this._tasks.next(tasksToUpdate);
    this.saveTasks();

    const currentCategories = this._categories.getValue();
    const updatedCategories = currentCategories.filter((c) => c.id !== id);

    this._categories.next(updatedCategories);
    this.saveCategories();
  }
}
