import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      const lastTask = this.tasks[this.tasks.length - 1];
      if (lastTask) {
        this.nextId = lastTask.id + 1;
      }
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string) {
    const newTask: Task = {
      id: this.nextId++,
      title,
      completed: false
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }

  updateTaskStatus(id: number, completed: boolean) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = completed;
      this.saveTasks();
    }
  }
}
