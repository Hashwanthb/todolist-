import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  identifier = '';
  password = '';
  identifierError = '';
  passwordError = '';
  generalError = '';

  constructor(private router: Router) {}

  login() {
    this.clearErrors();
    if (!this.identifier.trim()) {
      this.identifierError = 'Username or Email is required';
      return;
    }
    if (!this.password) {
      this.passwordError = 'Password is required';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.identifier === this.identifier && u.password === this.password);

    if (user) {
      localStorage.setItem('currentUser', this.identifier);
      this.router.navigate(['/tasks']);
    } else {
      this.generalError = 'Invalid username/email or password';
    }
  }

  clearErrors() {
    this.identifierError = '';
    this.passwordError = '';
    this.generalError = '';
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}