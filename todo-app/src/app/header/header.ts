import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  currentRoute = '';
  isLoggedIn = false;
  currentUser = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateAuthState();
    this.currentRoute = this.router.url;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateAuthState();
        this.currentRoute = this.router.url;
      });
  }

  updateAuthState() {
    this.currentUser = localStorage.getItem('currentUser') || '';
    this.isLoggedIn = !!this.currentUser;
  }

  goToTodo() { this.router.navigate(['/todo']); }
  goToTasks() { this.router.navigate(['/tasks']); }
  goToSignup() { this.router.navigate(['/signup']); }
  goToLogin() { this.router.navigate(['/login']); }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}