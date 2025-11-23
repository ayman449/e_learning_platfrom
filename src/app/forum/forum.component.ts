import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ForumService } from './forum.service'; // Uncommented the service import
import { Post, Reply, User } from '../interfaces/app.interfaces'; // Updated import path

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Add FormsModule here
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})



export class ForumComponent implements OnInit {
  posts: Post[] = [];
  newPostContent: string = '';
  newReplyContent: { [key: number]: string } = {}; // To store el reply  el kol  post







  // Static posts data (bech tkoun exmeple)
  staticPosts: Post[] = [
    {
      id: "1",
      user: { id: '1', userName: 'Nidhal', role: 'Student', avatar: '../../assets/stu.png' },
      content: 'This is a mock message from a student. I am enjoying the new Angular course!',
      timestamp: '2 hours ago',
      replies: [
        { id: 101, user: { id: '2', userName: 'Mr.Mourad', role: 'Professor', avatar: '../../assets/prof.png' }, content: 'Glad to hear that, Student A!', timestamp: '1 hour ago' },
        { id: 102, user: { id: '3', userName: 'Omar', role: 'Student', avatar: '../../assets/stu.png' }, content: 'Me too! The content is very clear.', timestamp: '30 minutes ago' }
      ]
    },
    {
      id: "2",
      user: { id: '4', userName: 'Mr Jane ', role: 'Professor', avatar: 'placeholder-professor-avatar.png' },
      content: 'Hello everyone, remember the upcoming deadline for Project 1.',
      timestamp: '1 day ago',
      replies: [
        { id: 201, user: { id: '5', userName: 'Amine', role: 'Student', avatar: '../../assets/stu.png' }, content: 'Thanks for the reminder, Professor!', timestamp: '5 hours ago' },
        { id: 202, user: { id: '6', userName: 'Mms. Jane', role: 'Professor', avatar: '../../assets/prof.png' }, content: 'You\'re welcome! Let me know if you have any further questions.', timestamp: '4 hours ago' }
      ]
    },
    {
      id: "3",
      user: { id: '7', userName: 'sarra', role: 'Student', avatar: 'placeholder-student-avatar-4.png' },
      content: 'I have a question about the latest lecture on Observables.',
      timestamp: '3 days ago',
      replies: [
        { id: 301, user: { id: '8', userName: 'Nidhal', role: 'Student', avatar: '../../assets/stu.png' }, content: 'I had the same question, Student D!', timestamp: '2 days ago' },
        { id: 302, user: { id: '9', userName: 'Mr.Khaled', role: 'Professor', avatar: '../../assets/prof.png' }, content: 'Please elaborate on your question, Student D, and I will be happy to help.', timestamp: '1 day ago' }
      ]
    }
  ];

  constructor(private forumService: ForumService) { } // Uncommented

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.forumService.getPosts().subscribe(data => {
      this.posts = data; // Populate posts from API
      // No explicit fallback to static data here, as the service already handles it
      console.log('Forum posts fetched:', this.posts);
    }, error => {
      console.error('Error fetching forum posts from service:', error);
      // The service already falls back to static data, so no need for an additional fallback here.
    });
  }

  createPost() {
    if (this.newPostContent.trim()) {
      // TODO: Replace with actual logged-in user data from auth service
      const currentUserId = 'u_current'; // Placeholder for current user ID

      this.forumService.createPost({ content: this.newPostContent, userId: currentUserId }).subscribe(response => {
        console.log('Post created successfully:', response);
        this.newPostContent = ''; // Clear input
        this.fetchPosts(); // Refresh posts
      }, error => {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
      });
    } else {
      alert('Post content cannot be empty.');
    }
  }

  createReply(postId: any) {
    const replyContent = this.newReplyContent[postId];
    if (replyContent && replyContent.trim()) {
      // TODO: Replace with actual logged-in user data from auth service
      const currentUserId = 'u_current_reply'; // Placeholder for current user ID

      this.forumService.createReply(postId, { content: replyContent, userId: currentUserId }).subscribe(response => {
        console.log('Reply created successfully:', response);
        this.newReplyContent[postId] = ''; // Clear input
        this.fetchPosts(); // Refresh posts
      }, error => {
        console.error('Error creating reply:', error);
        alert('Failed to create reply. Please try again.');
      });
    } else {
      alert('Reply content cannot be empty.');
    }
  }
}
