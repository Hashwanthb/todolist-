import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService, Task } from '../services/task.service';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './task-table.html',
  styleUrls: ['./task-table.css']
})
export class TaskTableComponent implements OnInit {
  tasks!: Task[];
  currentUser = 'Guest';

  constructor(private service: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') || 'Guest';
    this.tasks = this.service.getTasks();
  }

  delete(i: number) {
    this.service.deleteTask(i);
    this.tasks = this.service.getTasks();
  }

  edit(i: number) {
    this.router.navigate(['/todo'], { queryParams: { index: i } });
  }
}