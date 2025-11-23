import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Testimonial, Professor, Course } from '../interfaces/app.interfaces'; // Updated import path
import { HttpClient } from '@angular/common/http'; // Uncommented HttpClient
import { catchError } from 'rxjs/operators'; // Added catchError import

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  private apiUrl = 'YOUR_BACKEND_API_URL/landing-page'; // TODO: Replace with your actual backend API URL

  constructor(private http: HttpClient) { } // Uncommented HttpClient

  //testi will changed by the data from backend 
  getTestimonials(): Observable<Testimonial[]> {
    // TODO: Implement actual API call to fetch testimonials
    return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`).pipe(
      catchError(error => {
        console.error('Error fetching testimonials, using static data:', error);
        return of(this.createStaticTestimonials()); // Fallback to static data on error
      })
    );
  }

  private createStaticTestimonials(): Testimonial[] {
    return [
      {
        id: 1, 
        content: 'SkillBridge provided me with the flexibility to learn at my own pace and connect with amazing professors from around the world.',
        name: 'Ameni Gharbi',
        role: 'Computer Science Student, University of Tunis El Manar',
        avatar: 'assets/stu.png'
      },
      {
        id: 2, 
        content: 'The interactive live sessions and comprehensive course materials helped me grasp complex concepts easily.',
        name: 'New Student 1',
        role: 'Software Engineering Student, University of Carthage',
        avatar: 'assets/stu.png'
      },
      {
        id: 3, 
        content: 'This platform made it easy to follow my courses and attend live sessions from home.',
        name: 'New Student 2',
        role: 'Data Science Student, ESSEC Tunis',
        avatar: 'assets/stu.png'
      },
      {
        id: 4, 
        content: 'Another great testimonial about the platform experience.',
        name: 'Third Student',
        role: 'Marketing Student, University of Sousse',
        avatar: 'assets/stu.png'
      }
    ];
  }

  //profs will changed by the data from backend 
  getProfessors(): Observable<Professor[]> {
    // TODO: Implement actual API call to fetch professors
    return this.http.get<Professor[]>(`${this.apiUrl}/professors`).pipe(
      catchError(error => {
        console.error('Error fetching professors, using static data:', error);
        return of(this.createStaticProfessors()); // Fallback to static data on error
      })
    );
  }

  private createStaticProfessors(): Professor[] {
    return [
      {
        id: '1',
        image: 'assets/prof1.png',
        name: 'Samir Sbouai',
        title: 'Application Support, Analyst Lead',
        description: 'Former co-founder of Opendoor. Early staff at Spotify and ClassLit.',
        socialLinks: {
          linkedin: '#'
        }
      },
      {
        id: '2',
        image: 'assets/prof2.png',
        name: 'Mourad Jlassi',
        title: 'Director, Undergraduate Analytics and Planning',
        description: 'Lead engineering teams at Figma, Fitch, and Protocol Labs.',
        socialLinks: {
          linkedin: '#'
        }
      },
      {
        id: '3',
        image: 'assets/prof3.png',
        name: 'Fahim Dallagi',
        title: 'Career Educator',
        description: 'Former PM Inear. Lambda School, and Cr Berk.',
        socialLinks: {
          linkedin: '#'
        }
      },
      {
        id: '4',
        image: 'assets/prof4.png',
        name: 'Hedia Triki',
        title: 'Co-op Student Interns Program',
        description: 'Former PM Inear. Lambda School, and Cr Berk.',
        socialLinks: {
          linkedin: '#'
        }
      },
      {
        id: '5',
        image: 'assets/prof5.png',
        name: 'Professor New 1',
        title: 'New Title 1',
        description: 'Description for new professor 1.',
        socialLinks: {
          linkedin: '#'
        }
      },
      {
        id: '6',
        image: 'assets/prof6.png',
        name: 'Professor New 2',
        title: 'New Title 2',
        description: 'Description for new professor 2.',
        socialLinks: {
          linkedin: '#'
        }
      }
    ];
  }

  //courses will changed by the data from backend 
  getCourses(): Observable<Course[]> {
    // TODO: Implement actual API call to fetch courses
    return this.http.get<Course[]>(`${this.apiUrl}/courses`).pipe(
      catchError(error => {
        console.error('Error fetching courses, using static data:', error);
        return of(this.createStaticCourses()); // Fallback to static data on error
      })
    );
  }

  private createStaticCourses(): Course[] {
    return [
      {
        id: 1,
        image: 'assets/course1.jpg',
        title: 'Introduction to Algorithms',
        description: 'Classes in development that cover the most recent advancements in web and mobile.',
        rating: 4.5,
        price: 'Free',
      },
      {
        id: 2,
        image: 'assets/course2.jpg',
        title: 'Marketing Fundamentals',
        description: 'Master the fundamentals of business, leadership, and strategy.',
        rating: 3.8,
        price: '$49.99',
      },
      {
        id: 3,
        image: 'assets/course3.jpg',
        title: 'Business English Basics',
        description: 'Learn how to apply User Experience (UX) principles to your website designs.',
        rating: 4.1,
        price: '$29.99',
      }
    ];
  }
}
