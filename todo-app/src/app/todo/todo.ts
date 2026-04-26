import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodoComponent implements OnInit {
  task = '';
  date = '';
  time = '';
  ampm = 'AM';
  index: number | null = null;
  title = 'Add Task';

  constructor(
    private service: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const indexStr = this.route.snapshot.queryParamMap.get('index');
    this.index = indexStr ? parseInt(indexStr, 10) : null;
    if (this.index !== null) {
      const t = this.service.getTask(this.index);
      if (t) {
        this.task = t.task;
        this.date = t.date;
        this.time = t.time;
        this.ampm = t.ampm;
        this.title = 'Edit Task';
      }
    }
  }

  save() {
    const newTask = { task: this.task, date: this.date, time: this.time, ampm: this.ampm };
    if (this.index !== null) {
      this.service.updateTask(this.index, newTask);
    } else {
      this.service.addTask(newTask);
    }
    this.router.navigate(['/tasks']);
  }
}