import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for template-driven forms
import { SignupPageService } from './signup-page.service'; // Uncommented the service import
import { UserData } from '../interfaces/app.interfaces'; // Updated import path

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  userData: UserData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    termsAgreed: false
  };

  constructor(private signupPageService: SignupPageService) { } // Uncommented

  onSignup() {
    // TODO: Add client-side validation here before sending to service
    if (this.userData.password !== this.userData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!this.userData.termsAgreed) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    this.signupPageService.signup(this.userData).subscribe(response => {
      if (response.success) {
        console.log('Signup successful:', response.user);
        // TODO: Handle successful signup (e.g., navigate to login, show success message)
        alert(`Signup successful for ${this.userData.email} as ${this.userData.userType}!`);
      } else {
        console.error('Signup failed:', response.message);
        // TODO: Handle signup failure (e.g., display error message)
        alert(`Signup failed: ${response.message}`);
      }
    }, error => {
      console.error('Error during signup service call:', error);
      alert('An unexpected error occurred during signup. Please try again.');
    });
  }
}
