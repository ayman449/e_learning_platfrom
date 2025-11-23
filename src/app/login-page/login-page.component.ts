import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for template-driven forms
import { LoginPageService } from './login-page.service'; // Uncommented the service import
import { LoginData } from '../interfaces/app.interfaces'; // Updated import path

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  credentials: LoginData = {
    email: '',
    password: '',
    userType: 'student' // Default to student. Ensure this matches the LoginData interface.
  };

  constructor(private loginPageService: LoginPageService) { } // Uncommented

  onLogin() {
    this.loginPageService.login(this.credentials).subscribe(response => {
      if (response.success) {
        console.log('Login successful:', response.user);
        // TODO: Handle successful login (e.g., navigate to dashboard, store token)
        alert(`Login successful for ${this.credentials.email} as ${this.credentials.userType}!`);
      } else {
        console.error('Login failed:', response.message);
        // TODO: Handle login failure (e.g., display error message)
        alert(`Login failed: ${response.message}`);
      }
    }, error => {
      console.error('Error during login service call:', error);
      alert('An unexpected error occurred during login. Please try again.');
    });
  }
}
