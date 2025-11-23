import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Uncommented HttpClient
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Added catchError
import { Post, Reply, User } from '../interfaces/app.interfaces'; // Updated import path

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = '/api/forum'; // Placeholder for your forum API endpoint

  constructor(private http: HttpClient) { } // Uncommented HttpClient

  getPosts(): Observable<Post[]> {
    // TODO: Implement actual API call to fetch forum posts.
    return this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
      catchError(error => {
        console.error('Error fetching forum posts, using static data:', error);
        return of(this.createStaticPosts()); // Fallback to static data on error
      })
    );
  }

  private createStaticPosts(): Post[] {
    return [
      { id: '1', user: { id: 'u1', userName: 'Alice', role: 'Student', avatar: 'avatar-alice.png' }, content: 'Any tips for learning Angular quickly?', timestamp: '2023-10-26T10:00:00Z', replies: [] },
      { id: '2', user: { id: 'u2', userName: 'Bob', role: 'Professor', avatar: 'avatar-bob.png' }, content: 'New assignment posted for Database Management.', timestamp: '2023-10-25T15:30:00Z', replies: [] }
    ];
  }

  createPost(postData: { content: string, userId: string }): Observable<Post> {
    // TODO: Implement actual API call to create a new forum post.
    // The backend should generate the ID, timestamp, and associate the User object.
    return this.http.post<Post>(`${this.apiUrl}/posts`, postData).pipe(
      catchError(error => {
        console.error('Error creating post:', error);
        return throwError(() => new Error('Failed to create post statically.'));
      })
    );
  }

  createReply(postId: string, replyData: { content: string, userId: string }): Observable<Reply> {
    // TODO: Implement actual API call to create a reply to a post.
    // The backend should generate the ID, timestamp, and associate the User object.
    return this.http.post<Reply>(`${this.apiUrl}/posts/${postId}/replies`, replyData).pipe(
      catchError(error => {
        console.error(`Error creating reply for post ${postId}:`, error);
        return throwError(() => new Error('Failed to create reply statically.'));
      })
    );
  }
}
