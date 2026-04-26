import { Injectable } from '@angular/core';

export interface Task {
  task: string;
  date: string;
  time: string;
  ampm: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private getCurrentUser() {
    return localStorage.getItem('currentUser');
  }

  private getTasksKey() {
    const user = this.getCurrentUser();
    return user ? `tasks_${user}` : null;
  }

  getTasks(): Task[] {
    const key = this.getTasksKey();
    if (!key) return [];
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  addTask(task: Task) {
    const key = this.getTasksKey();
    if (!key) return;
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(key, JSON.stringify(tasks));
  }

  updateTask(index: number, task: Task) {
    const key = this.getTasksKey();
    if (!key) return;
    const tasks = this.getTasks();
    tasks[index] = task;
    localStorage.setItem(key, JSON.stringify(tasks));
  }

  deleteTask(index: number) {
    const key = this.getTasksKey();
    if (!key) return;
    const tasks = this.getTasks();
    tasks.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(tasks));
  }

  getTask(index: number): Task | null {
    return this.getTasks()[index] || null;
  }
}