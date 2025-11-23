import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Uncommented HttpClient
import { Observable, of, throwError } from 'rxjs'; // Added throwError
import { catchError } from 'rxjs/operators'; // Added catchError
import { Course, Professor } from '../interfaces/app.interfaces'; // Updated import path, added Professor

@Injectable({
  providedIn: 'root'
})
export class ProfessorDashboardService {
  private apiUrl = '/api/professor'; // Placeholder for your professor API endpoint

  constructor(private http: HttpClient) { } // Uncommented HttpClient

  getProfessorCourses(professorId: string): Observable<Course[]> {
    // TODO: Implement actual API call to fetch courses for a specific professor
    return this.http.get<Course[]>(`${this.apiUrl}/${professorId}/courses`).pipe(
      catchError(error => {
        console.error(`Error fetching courses for professor ID: ${professorId}, using static data:`, error);
        return of(this.createStaticCourses()); // Fallback to static data on error
      })
    );
  }

  private createStaticCourses(): Course[] {
    return [
      { id: 1, title: 'Advanced Web Development', description: 'Deep dive into modern web technologies.', instructor: 'Professor Jane Doe', image: 'assets/course1.jpg', rating: 4.8, price: '$99.99' },
      { id: 2, title: 'Introduction to Algorithms', description: 'Fundamentals of data structures and algorithms.', instructor: 'Professor Jane Doe', image: 'assets/course2.jpg', rating: 4.5, price: '$79.99' },
      { id: 3, title: 'Database Management Systems', description: 'Design and manage relational databases.', instructor: 'Professor Jane Doe', image: 'assets/course3.jpg', rating: 4.2, price: '$89.99' },
    ];
  }

  createAnnouncement(announcementData: any): Observable<any> {
    // TODO: Implement actual API call to create a new announcement
    return this.http.post(`${this.apiUrl}/announcements`, announcementData).pipe(
      catchError(error => {
        console.error('Error creating announcement:', error);
        return throwError(() => new Error('Failed to create announcement statically.'));
      })
    );
  }

  createCourse(courseData: FormData): Observable<any> {
    // TODO: Implement actual API call to create a new course. Ensure your backend handles FormData for file uploads.
    return this.http.post(`${this.apiUrl}/courses`, courseData).pipe(
      catchError(error => {
        console.error('Error creating course:', error);
        return throwError(() => new Error('Failed to create course statically.'));
      })
    );
  }

  updateProfessorProfile(professorId: string, profileData: FormData): Observable<any> {
    // TODO: Implement actual API call to update professor profile, including image upload
    return this.http.put(`${this.apiUrl}/${professorId}/profile`, profileData).pipe(
      catchError(error => {
        console.error('Error updating professor profile:', error);
        return throwError(() => new Error('Failed to update profile statically.'));
      })
    );
  }
}
