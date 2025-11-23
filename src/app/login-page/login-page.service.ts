import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Uncommented HttpClient
import { Observable, of, throwError } from 'rxjs'; // Added throwError
import { catchError } from 'rxjs/operators'; // Added catchError
import { LoginData, LoginResponse } from '../interfaces/app.interfaces'; // Updated import path

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  private apiUrl = '/api/auth'; // Base URL for your authentication API

  constructor(private http: HttpClient) { } // Uncommented HttpClient

  login(credentials: LoginData): Observable<LoginResponse> {
    // TODO: Implement actual API call for login.
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        // Simulate a failed login response on error for now
        return of({ success: false, message: 'Login failed due to server error (static simulation)' });
      })
    );
  }
}
