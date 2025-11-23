import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Uncommented HttpClient
import { Observable, of, throwError } from 'rxjs'; // Added throwError
import { catchError } from 'rxjs/operators'; // Added catchError
import { UserData, SignupResponse } from '../interfaces/app.interfaces'; // Updated import path

@Injectable({
  providedIn: 'root'
})
export class SignupPageService {
  private apiUrl = '/api/auth'; // Placeholder for your API endpoint

  constructor(private http: HttpClient) { } // Uncommented HttpClient

  signup(userData: UserData): Observable<SignupResponse> {
    // Create a new object without confirmPassword for the backend call
    const dataToSend = { ...userData };
    // The backend should not receive confirmPassword
    delete dataToSend.confirmPassword; // Safely remove confirmPassword if it still exists for some reason

    // TODO: Implement actual API call for registration.
    return this.http.post<SignupResponse>(`${this.apiUrl}/register`, dataToSend).pipe(
      catchError(error => {
        console.error('Signup failed:', error);
        // Simulate a failed signup response on error for now
        return of({ success: false, message: 'Signup failed due to server error (static simulation)' });
      })
    );
  }
}
