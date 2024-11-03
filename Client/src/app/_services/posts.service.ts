import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../_models/post';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  posts = signal<Post[]>([]);

  getPosts() {
    return this.http.get<Post[]>(this.baseUrl + 'posts').subscribe({
      next: (posts) => this.posts.set(posts),
    });
  }

  getPostById(id: number) {
    const post = this.posts().find((x) => x.id === id);
    if (post !== undefined) return of(post);

    return this.http.get<Post>(this.baseUrl + 'posts/' + id);
  }

  /* olde version method - getPostByUsername
  getPostByUsername(username: string) {
    const post = this.posts().find((x) => x.userName === username);
    if (post !== undefined) return of(post);

    return this.http.get<Post[]>(`${this.baseUrl}posts/user/${username}`);
  }
*/

  getPostByUsername(username: string): Observable<Post[]> {
    const posts = this.posts().filter((x) => x.userName === username);
    if (posts.length > 0) return of(posts);
  
    return this.http.get<Post[]>(`${this.baseUrl}posts/user/${username}`);
  }

  addPost(postData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}posts/add-post`, postData);
  }
}