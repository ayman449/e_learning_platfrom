import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Uncommented HttpClient
import { Observable, of, throwError } from 'rxjs'; // Added throwError
import { catchError } from 'rxjs/operators'; // Added catchError
import { CourseDetails, Video, Assignment, File, Professor } from '../interfaces/app.interfaces'; // Import interfaces

@Injectable({
  providedIn: 'root'
})
export class CoursePageService {
  private apiUrl = 'YOUR_BACKEND_API_URL/courses'; // TODO: Replace with your actual backend API URL

  constructor(private http: HttpClient) { } // Uncommented HttpClient

  // Method to fetch course details by ID
  getCourseDetails(courseId: string): Observable<CourseDetails> {
    // TODO: Replace with actual API call to fetch course details
    return this.http.get<CourseDetails>(`${this.apiUrl}/${courseId}`).pipe(
      catchError(error => {
        console.error(`Error fetching course details for ID: ${courseId}`, error);
        return of(this.createStaticCourseDetails(courseId)); // Fallback to static data on error
      })
    );
  }

  private createStaticCourseDetails(courseId: string): CourseDetails {
    return {
      id: courseId,
      title: 'Introduction to Angular',
      description: 'Learn the fundamentals of Angular framework, including components, services, routing, and data binding.'
    };
  }

  // Method to fetch videos for a specific course
  getCourseVideos(courseId: string): Observable<Video[]> {
    // TODO: Replace with actual API call to fetch course videos
    return this.http.get<Video[]>(`${this.apiUrl}/${courseId}/videos`).pipe(
      catchError(error => {
        console.error(`Error fetching videos for course ID: ${courseId}`, error);
        return of(this.createStaticVideos()); // Fallback to static data on error
      })
    );
  }

  private createStaticVideos(): Video[] {
    return [
      { id: '1', title: 'Angular Basics', thumbnail: 'angular-basics-thumb.jpg', url: 'https://www.youtube.com/watch?v=video1' },
      { id: '2', title: 'Components & Modules', thumbnail: 'components-modules-thumb.jpg', url: 'https://www.vimeo.com/video2' }
    ];
  }

  // Method to fetch assignments for a specific course
  getCourseAssignments(courseId: string): Observable<Assignment[]> {
    // TODO: Replace with actual API call to fetch course assignments
    return this.http.get<Assignment[]>(`${this.apiUrl}/${courseId}/assignments`).pipe(
      catchError(error => {
        console.error(`Error fetching assignments for course ID: ${courseId}`, error);
        return of(this.createStaticAssignments()); // Fallback to static data on error
      })
    );
  }

  private createStaticAssignments(): Assignment[] {
    return [
      { id: 1, title: 'Angular Project Setup', description: 'Set up your first Angular project and explore its structure.', date: '2023-12-01' },
      { id: 2, title: 'Component Interaction', description: 'Implement communication between parent and child components.', date: '2023-12-15' }
    ];
  }

  // Method to fetch downloadable files for a specific course
  getCourseFiles(courseId: string): Observable<File[]> {
    // TODO: Replace with actual API call to fetch course files
    return this.http.get<File[]>(`${this.apiUrl}/${courseId}/files`).pipe(
      catchError(error => {
        console.error(`Error fetching files for course ID: ${courseId}`, error);
        return of(this.createStaticFiles()); // Fallback to static data on error
      })
    );
  }

  private createStaticFiles(): File[] {
    return [
      { id: 1, name: 'Angular Cheatsheet.pdf', url: 'assets/angular_cheatsheet.pdf', type: 'pdf' },
      { id: 2, name: 'Lecture Slides.pptx', url: 'assets/lecture_slides.pptx', type: 'pptx' }
    ];
  }

  // Method to fetch professor details for a specific course
  getCourseProfessor(courseId: string): Observable<Professor> {
    // TODO: Replace with actual API call to fetch professor details for the course
    return this.http.get<Professor>(`${this.apiUrl}/${courseId}/professor`).pipe(
      catchError(error => {
        console.error(`Error fetching professor for course ID: ${courseId}`, error);
        return of(this.createStaticProfessor()); // Fallback to static data on error
      })
    );
  }

  private createStaticProfessor(): Professor {
    return {
      id: '101',
      name: 'Dr. Alice Wonderland',
      description: 'Experienced Angular developer and instructor.',
      image: 'placeholder-professor-alice.png',
      title: 'Lead Web Developer',
      socialLinks: { linkedin: '#' }
    };
  }
}
