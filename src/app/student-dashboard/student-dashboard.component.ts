import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { StudentDashboardService } from './student-dashboard.service'; // Uncommented the service import
import { Student, Course, Announcement } from '../interfaces/app.interfaces'; // Import interfaces

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  studentName: string = '';
  profileImage: string = '';
  university: string = '';
  major: string = '';
  studentDescription: string = '';

  myCourses: Course[] = [];

  progressValue: number = 0; // Initialize to 0, will be calculated dynamically

  newAnnouncements: Announcement[] = [];

  showEditProfileForm: boolean = false; // Controls visibility of the edit form
  studentProfile: Student = {
    id: '',
    name: '',
    email: '',
    university: '',
    major: '',
    description: '',
    profileImage: '',
    userType: 'student'
  };
  selectedFile: File | null = null; // To hold the selected image file

  constructor(private studentDashboardService: StudentDashboardService) { } // Uncommented

  ngOnInit(): void {
    this.fetchStudentProfile();
    this.fetchStudentCourses();
    this.fetchNewAnnouncements();
    this.calculateProgress(); // Ensure progress is calculated on init even with static data
  }

  fetchStudentProfile(): void {
    this.studentDashboardService.getStudentProfile().subscribe({
      next: (data: Student) => {
        this.studentProfile = data;
        this.studentName = data.name;
        this.profileImage = data.profileImage;
        this.university = data.university;
        this.major = data.major;
        this.studentDescription = data.description;
      },
      error: (err) => {
        console.error('Error fetching student profile:', err);
        // Service already handles fallback to static data
      }
    });
  }

  fetchStudentCourses(): void {
    this.studentDashboardService.getStudentCourses().subscribe({
      next: (data: Course[]) => {
        this.myCourses = data;
        this.calculateProgress();
      },
      error: (err) => {
        console.error('Error fetching student courses:', err);
        // Service already handles fallback to static data
      }
    });
  }

  fetchNewAnnouncements(): void {
    this.studentDashboardService.getNewAnnouncements().subscribe({
      next: (data: Announcement[]) => {
        this.newAnnouncements = data;
      },
      error: (err) => {
        console.error('Error fetching announcements:', err);
        // Service already handles fallback to static data
      }
    });
  }

  calculateProgress(): void {
    if (this.myCourses.length === 0) {
      this.progressValue = 0;
      return;
    }
    const completedCourses = this.myCourses.filter(course => course.completed).length;
    this.progressValue = (completedCourses / this.myCourses.length) * 100;
  }

  toggleCourseCompletion(courseId: number): void {
    const course = this.myCourses.find(c => c.id === courseId);
    if (course) {
      const newCompletedStatus = !course.completed;
      this.studentDashboardService.updateCourseCompletion(courseId, newCompletedStatus).subscribe({
        next: () => {
          course.completed = newCompletedStatus; // Update UI only after successful backend update
          this.calculateProgress(); // Recalculate progress after toggling
        },
        error: (err) => {
          console.error('Error updating course completion status:', err);
          alert('Failed to update course completion. Please try again.');
        }
      });
    }
  }

  logout(): void {
    console.log('Student logged out');
    // TODO: Implement actual logout logic (e.g., clear session, navigate to login)
  }

  toggleEditProfileForm(): void {
    this.showEditProfileForm = !this.showEditProfileForm;
    if (this.showEditProfileForm) {
      // Initialize form with current values when opening
      this.studentProfile = { ...this.studentProfile }; // Create a shallow copy to prevent direct mutation
      this.selectedFile = null; // Reset selected file
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  submitProfileChanges(): void {
    if (!this.studentProfile.id) {
      console.error('Student ID is not available. Cannot update profile.');
      alert('Failed to update profile: Student ID is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.studentProfile.name);
    formData.append('university', this.studentProfile.university);
    formData.append('major', this.studentProfile.major);
    formData.append('description', this.studentProfile.description);

    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile, this.selectedFile.name);
    }

    this.studentDashboardService.updateStudentProfile(this.studentProfile.id, formData).subscribe({
      next: (response) => {
        console.log('Profile update response:', response);
        // Update component properties after successful submission (or API response)
        this.studentName = this.studentProfile.name;
        this.university = this.studentProfile.university;
        this.major = this.studentProfile.major;
        this.studentDescription = this.studentProfile.description;

        if (this.selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              this.profileImage = reader.result; // Update profile image to new image
            }
          };
          if (this.selectedFile) {
            reader.readAsDataURL(this.selectedFile);
          }
        }

        this.toggleEditProfileForm(); // Close form after submission
        alert('Profile updated successfully!');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please try again.');
      }
    });
  }
}
