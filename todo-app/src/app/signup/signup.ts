import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  identifier = '';
  password = '';
  confirmPassword = '';
  identifierError = '';
  passwordError = '';
  confirmError = '';

  constructor(private router: Router) {}

  signup() {
    this.clearErrors();

    if (!this.identifier.trim()) {
      this.identifierError = 'Username or Email is required';
      return;
    }
    if (!this.password) {
      this.passwordError = 'Password is required';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.confirmError = 'Passwords do not match';
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.identifier === this.identifier)) {
      this.identifierError = 'This username/email already exists';
      return;
    }

    users.push({ identifier: this.identifier, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Please login.');
    this.router.navigate(['/login']);
  }

  clearErrors() {
    this.identifierError = '';
    this.passwordError = '';
    this.confirmError = '';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}