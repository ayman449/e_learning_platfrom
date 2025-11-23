import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Uncommented HttpClient
import { Observable, of, throwError } from 'rxjs'; // Added throwError
import { catchError } from 'rxjs/operators'; // Added catchError
import { Student, Course, Announcement } from '../interfaces/app.interfaces'; // Import interfaces

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {
  private apiUrl = 'YOUR_BACKEND_API_URL/student'; // TODO: Replace with your actual backend API URL

  constructor(private http: HttpClient) { } // Uncommented HttpClient

  /**
   * @description Fetches the student's profile details from the backend.
   * @returns An Observable of Student interface.
   */
  getStudentProfile(): Observable<Student> {
    // TODO: Implement actual API call to fetch student profile
    return this.http.get<Student>(`${this.apiUrl}/profile`).pipe(
      catchError(error => {
        console.error('Error fetching student profile, using static data:', error);
        return of(this.createStaticStudentProfile()); // Fallback to static data on error
      })
    );
  }

  private createStaticStudentProfile(): Student {
    return {
      id: 'student-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      university: 'University of Tunis El Manar',
      major: 'Computer Science',
      description: 'A passionate learner eager to explore new technologies and expand knowledge in web development and data science.',
      profileImage: 'placeholder-student-profile.png',
      userType: 'student'
    };
  }

  /**
   * @description Updates the student's profile details on the backend.
   * @param profileData The FormData object with updated information and optional profile image.
   * @returns An Observable of the updated Student interface or a confirmation object.
   */
  updateStudentProfile(studentId: string, profileData: FormData): Observable<any> {
    // TODO: Implement actual API call to update student profile, including image upload
    return this.http.put(`${this.apiUrl}/${studentId}/profile`, profileData).pipe(
      catchError(error => {
        console.error('Error updating student profile:', error);
        return throwError(() => new Error('Failed to update profile statically.'));
      })
    );
  }

  /**
   * @description Fetches the courses enrolled by the student from the backend.
   * @returns An Observable of an array of Course interface.
   */
  getStudentCourses(): Observable<Course[]> {
    // TODO: Implement actual API call to fetch student courses
    return this.http.get<Course[]>(`${this.apiUrl}/courses`).pipe(
      catchError(error => {
        console.error('Error fetching student courses, using static data:', error);
        return of(this.createStaticCourses()); // Fallback to static data on error
      })
    );
  }

  private createStaticCourses(): Course[] {
    return [
      { id: 1, title: 'Introduction to Angular', description: 'Learn the basics of Angular.', instructor: 'Professor Smith', image: 'angular.png', rating: 4.5, price: 'Free', completed: false },
      { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript concepts.', instructor: 'Professor Jane Doe', image: 'javascript.png', rating: 4.8, price: '$49.99', completed: true },
      { id: 3, title: 'Backend Development with Node.js', description: 'Build robust backends with Node.js.', instructor: 'Professor Alan Turing', image: 'nodejs.png', rating: 4.2, price: '$79.99', completed: false }
    ];
  }

  /**
   * @description Fetches new announcements for the student from the backend.
   * @returns An Observable of an array of Announcement interface.
   */
  getNewAnnouncements(): Observable<Announcement[]> {
    // TODO: Implement actual API call to fetch new announcements
    return this.http.get<Announcement[]>(`${this.apiUrl}/announcements`).pipe(
      catchError(error => {
        console.error('Error fetching announcements, using static data:', error);
        return of(this.createStaticAnnouncements()); // Fallback to static data on error
      })
    );
  }

  private createStaticAnnouncements(): Announcement[] {
    return [
      { id: 1, content: 'Professor Smith posted a new lecture on Data Structures.', professorName: 'Professor Smith', professorTitle: 'Computer Science', timestamp: '2023-10-26T10:00:00Z' },
      { id: 2, content: 'Assignment 3 for Web Development is due next Friday.', professorName: 'Professor Jane Doe', professorTitle: 'Web Development', timestamp: '2023-10-25T15:30:00Z' },
      { id: 3, content: 'There will be a Q&A session for the AI course tomorrow at 3 PM.', professorName: 'Professor Alan Turing', professorTitle: 'Artificial Intelligence', timestamp: '2023-10-24T09:00:00Z' },
      { id: 4, content: 'The new course \'Cloud Computing Fundamentals\' is now available.', professorName: 'Professor Maria Curie', professorTitle: 'Cloud Computing', timestamp: '2023-10-23T11:45:00Z' }
    ];
  }

  /**
   * @description Updates the completion status of a course for the student on the backend.
   * @param courseId The ID of the course to update.
   * @param completed The new completion status.
   * @returns An Observable of a confirmation object.
   */
  updateCourseCompletion(courseId: number, completed: boolean): Observable<any> {
    // TODO: Implement actual API call to update course completion status
    return this.http.put(`${this.apiUrl}/courses/${courseId}/completion`, { completed }).pipe(
      catchError(error => {
        console.error(`Error updating course ${courseId} completion status:`, error);
        return throwError(() => new Error('Failed to update course completion statically.'));
      })
    );
  }
}
