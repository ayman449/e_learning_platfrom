import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Uncommented HttpClient
import { Observable, of, throwError } from 'rxjs'; // Added throwError
import { catchError } from 'rxjs/operators'; // Added catchError
import { Course } from '../interfaces/app.interfaces'; // Updated import path

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  private apiUrl = '/api/courses'; // Placeholder for your API endpoint for courses

  constructor(private http: HttpClient) { } // Uncommented HttpClient

  getCourses(): Observable<Course[]> {
    // TODO: Implement actual API call to fetch courses.
    return this.http.get<Course[]>(`${this.apiUrl}/all`).pipe(
      catchError(error => {
        console.error('Error fetching courses, using static data:', error);
        return of(this.createStaticCourses()); // Fallback to static data on error
      })
    );
  }

  private createStaticCourses(): Course[] {
    return [
      { id:1, title: 'Introduction to Programming', description: 'Learn the basics of coding.', instructor: 'Professor Smith', image: 'course-programming.jpg', rating: 4.5, price: 'Free' },
      { id:2, title: 'Web Design Fundamentals', description: 'Create beautiful and responsive websites.', instructor: 'Professor Jane Doe', image: 'course-webdesign.jpg', rating: 4.2, price: '$29.99' },
      { id:3, title: 'Data Science with Python', description: 'Explore data analysis and machine learning.', instructor: 'Professor Alan Turing', image: 'course-datascience.jpg', rating: 4.8, price: '$59.99' }
    ];
  }
}
