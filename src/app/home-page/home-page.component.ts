import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink
import { HomePageService } from './home-page.service'; // Uncommented
import { Course } from '../interfaces/app.interfaces'; // Updated import path

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add CommonModule and RouterModule here
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  courses: Course[] = []; // Use the Course interface

  constructor(private homePageService: HomePageService) { } // Uncommented

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.homePageService.getCourses().subscribe(data => {
      this.courses = data;
      console.log('Courses fetched:', this.courses);
    }, error => {
      console.error('Error fetching courses from service:', error);
      // The service already falls back to static data, so no need for an additional fallback here.
    });
  }
}
