import { Component, OnInit } from '@angular/core';
import { Professor } from '../interfaces/app.interfaces'; // Assuming we can reuse the Professor interface
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProfessorDashboardService } from './professor-dashboard.service'; // Uncommented the service import
import { Course } from '../interfaces/app.interfaces'; // Import Course interface for myCourses type
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './professor-dashboard.component.html',
  styleUrl: './professor-dashboard.component.css'
})
export class ProfessorDashboardComponent implements OnInit {
  professor: Professor = {
    id: '1',
    name: 'Professor Jane Doe',
    title: 'Computer Science Department Head',
    description: 'Passionate educator with over 10 years of experience in computer science and web development. Dedicated to fostering student growth and innovation.',
    image: 'placeholder-professor-profile.png',
    socialLinks: { linkedin: '#' }
  };

  // TODO: Remove staticCourses after API is fully connected and returning data
  staticCourses: Course[] = [
    { id: 1, title: 'Advanced Web Development', description: 'Deep dive into modern web technologies.', instructor: 'Professor Jane Doe', image: 'assets/course1.jpg', rating: 4.8, price: '$99.99' },
    { id: 2, title: 'Introduction to Algorithms', description: 'Fundamentals of data structures and algorithms.', instructor: 'Professor Jane Doe', image: 'assets/course2.jpg', rating: 4.5, price: '$79.99' },
    { id: 3, title: 'Database Management Systems', description: 'Design and manage relational databases.', instructor: 'Professor Jane Doe', image: 'assets/course3.jpg', rating: 4.2, price: '$89.99' },
  ];

  myCourses: Course[] = []; // Use Course interface

  showAnnouncementForm: boolean = false;
  newAnnouncement = {
    title: '',
    description: '',
    courseId: null as number | null // Changed to number | null
  };

  showEditProfileForm: boolean = false; // Controls visibility of the edit form
  professorProfile: Professor = { ...this.professor }; // Initialize with current professor data
  selectedFile: File | null = null; // To hold the selected image file

  showCreateCourseForm: boolean = false; // Controls visibility of the create course form
  newCourse = {
    title: '',
    description: '',
    professorIntroduction: '', // New: Professor's introduction specific to this course
    thumbnail: '', // Will store the URL or base64 string after upload/selection
    videoLinks: [''], // Array to hold multiple video URLs
    pdfFiles: [] as File[], // Array to hold multiple PDF files
    professorId: this.professor.id // Assign the current professor's ID
  };
  selectedThumbnail: File | null = null; // To hold the selected thumbnail file
  selectedPdfs: File[] = []; // To hold the selected PDF files

  constructor(private professorDashboardService: ProfessorDashboardService) { } // Uncommented

  ngOnInit(): void {
    this.fetchProfessorCourses();
  }

  fetchProfessorCourses(): void {
    if (this.professor.id) {
      this.professorDashboardService.getProfessorCourses(this.professor.id).subscribe(data => {
        this.myCourses = data;
        console.log('Professor courses fetched:', this.myCourses);
      }, error => {
        console.error('Error fetching professor courses from service:', error);
        // Service already handles fallback to static data
      });
    } else {
      console.error('Professor ID is not available. Cannot fetch courses.');
      this.myCourses = this.staticCourses; // Use static data if professor ID is not available
    }
  }

  // Method to handle logout (placeholder)
  logout(): void {
    console.log('Professor logged out');
    // TODO: Implement actual logout logic (e.g., clear session, navigate to login)
  }

  toggleAnnouncementForm(): void {
    this.showAnnouncementForm = !this.showAnnouncementForm;
    // Reset form when closing
    if (!this.showAnnouncementForm) {
      this.newAnnouncement = { title: '', description: '', courseId: null };
    }
  }

  submitAnnouncement(): void {
    if (this.newAnnouncement.title.trim() && this.newAnnouncement.description.trim() && this.newAnnouncement.courseId !== null) {
      console.log('Submitting announcement:', this.newAnnouncement);
      this.professorDashboardService.createAnnouncement(this.newAnnouncement).subscribe(response => {
        console.log('Announcement created successfully:', response);
        this.toggleAnnouncementForm(); // Close form on success
        this.fetchProfessorCourses(); // Refresh courses to potentially show new announcement
      }, error => {
        console.error('Error creating announcement:', error);
        alert('Failed to create announcement. Please try again.');
      });
    } else {
      alert('Please fill in all fields and select a course.');
    }
  }

  toggleEditProfileForm(): void {
    this.showEditProfileForm = !this.showEditProfileForm;
    if (this.showEditProfileForm) {
      // Initialize form with current values when opening
      this.professorProfile = { ...this.professor }; // Create a shallow copy to prevent direct mutation
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
    if (!this.professor.id) {
      console.error('Professor ID is not available. Cannot update profile.');
      alert('Failed to update profile: Professor ID is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.professorProfile.name);
    formData.append('title', this.professorProfile.title);
    formData.append('description', this.professorProfile.description);

    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile, this.selectedFile.name);
    }

    this.professorDashboardService.updateProfessorProfile(this.professor.id, formData).subscribe({
      next: (response) => {
        console.log('Profile update response:', response);
        // Update component properties after successful submission (or API response)
        this.professor.name = this.professorProfile.name;
        this.professor.title = this.professorProfile.title;
        this.professor.description = this.professorProfile.description;

        if (this.selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              this.professor.image = reader.result; // Update profile image to new image
            }
          };
          if (this.selectedFile) {
            reader.readAsDataURL(this.selectedFile);
          }
        }

        this.toggleEditProfileForm(); // Close form after submission
        alert('Professor profile updated successfully!');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please try again.');
      }
    });
  }

  toggleCreateCourseForm(): void {
    this.showCreateCourseForm = !this.showCreateCourseForm;
    // Reset form when closing
    if (!this.showCreateCourseForm) {
      this.newCourse = {
        title: '',
        description: '',
        professorIntroduction: '', // Reset this field too
        thumbnail: '',
        videoLinks: [''],
        pdfFiles: [] as File[],
        professorId: this.professor.id
      };
      this.selectedThumbnail = null;
      this.selectedPdfs = [];
    }
  }

  addVideoLink(): void {
    this.newCourse.videoLinks.push('');
  }

  removeVideoLink(index: number): void {
    this.newCourse.videoLinks.splice(index, 1);
  }

  onThumbnailSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedThumbnail = file;
    } else {
      this.selectedThumbnail = null;
    }
  }

  onPdfSelected(event: any): void {
    const files: FileList | null = event.target.files;
    if (files) {
      this.selectedPdfs = Array.from(files);
    } else {
      this.selectedPdfs = [];
    }
  }

  submitCourse(): void {
    if (this.newCourse.title.trim() && this.newCourse.description.trim() && this.newCourse.videoLinks.some(link => link.trim() !== '')) {
      console.log('Submitting new course:', this.newCourse);

      const formData = new FormData();
      formData.append('title', this.newCourse.title);
      formData.append('description', this.newCourse.description);
      formData.append('professorIntroduction', this.newCourse.professorIntroduction); // Add new field
      formData.append('professorId', this.newCourse.professorId);
      if (this.selectedThumbnail) {
        formData.append('thumbnail', this.selectedThumbnail, this.selectedThumbnail.name);
      }
      this.newCourse.videoLinks.forEach((link, index) => {
        if (link.trim() !== '') {
          formData.append(`videoLinks[${index}]`, link);
        }
      });
      this.selectedPdfs.forEach((pdfFile, index) => {
        formData.append(`pdfFiles[${index}]`, pdfFile, pdfFile.name);
      });
      this.professorDashboardService.createCourse(formData).subscribe(response => {
        console.log('Course created successfully:', response);
        this.toggleCreateCourseForm(); // Close form on success
        this.fetchProfessorCourses(); // Refresh course list
      }, error => {
        console.error('Error creating course:', error);
        alert('Failed to create course. Please try again.');
      });
    } else {
      alert('Please fill in at least the course title, description, and one video link.');
    }
  }
}
