import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursePageService } from './course-page.service'; // Uncommented
import { CourseDetails, Video, Assignment, File, Professor } from '../interfaces/app.interfaces'; // Updated import path

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})
export class CoursePageComponent implements OnInit {
  //chouf el interfaces fil course.interfaces.ts w raka7hom hasb  entities mt3 databse
  courseId: string | null = null;
  courseDetails: CourseDetails = { id: '', title: '', description: '' }; // Initialize with default values
  videos: Video[] = [];
  assignments: Assignment[] = []; // Renamed from announcements to assignments
  files: File[] = [];
  professor: Professor = { id: '', name: '', description: '', image: '', title: '', socialLinks: {} }; // Initialize with default values according to app.interfaces.ts

  constructor(
    private route: ActivatedRoute,
    private coursePageService: CoursePageService // Uncommented
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.fetchCourseDetails(this.courseId);
      this.fetchCourseVideos(this.courseId);
      this.fetchCourseAssignments(this.courseId);
      this.fetchCourseFiles(this.courseId);
      this.fetchCourseProfessor(this.courseId);
    }
  }

  fetchCourseDetails(courseId: string): void {
    this.coursePageService.getCourseDetails(courseId).subscribe(data => {
      this.courseDetails = data;
      // TODO: Handle case where courseDetails might be empty or null
    });
  }

  fetchCourseVideos(courseId: string): void {
    this.coursePageService.getCourseVideos(courseId).subscribe(data => {
      this.videos = data;
      // TODO: Handle case where videos might be empty
    });
  }

  fetchCourseAssignments(courseId: string): void {
    this.coursePageService.getCourseAssignments(courseId).subscribe(data => {
      this.assignments = data; // Using assignments array
      // TODO: Handle case where assignments might be empty
    });
  }

  fetchCourseFiles(courseId: string): void {
    this.coursePageService.getCourseFiles(courseId).subscribe(data => {
      this.files = data;
      // TODO: Handle case where files might be empty
    });
  }

  fetchCourseProfessor(courseId: string): void {
    // this.coursePageService.getCourseProfessor(courseId).subscribe(data => {
    //   this.professor = data;
    //   // TODO: Handle case where professor might be empty or null
    // });
    console.log(`Static: Fetching professor for course ID: ${courseId}`);
    this.professor = {
      id: "101",
      name: 'Dr. Alice Wonderland',
      description: 'Experienced Angular developer and instructor.',
      image: 'placeholder-professor-alice.png',
      title: 'Lead Web Developer',
      socialLinks: { linkedin: '#' }
    };
  }
}
