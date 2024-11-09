import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../_models/post';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  posts = signal<Post[]>([]);
  postCashe = new Map();

  getPosts() {
    return this.http.get<Post[]>(this.baseUrl + 'posts').subscribe({
      next: (posts) => this.posts.set(posts),
    });
  }

  getPostById(id: number): Observable<Post> {
    const post: Post = [...this.postCashe.values()]
    .reduce((arr, elem) => arr.concat(elem.body), [])
    .find((p: Post) => p.id  === id);

    if(post) return of(post);

    return this.http.get<Post>(`${this.baseUrl}posts/${id}`).pipe(
      tap((post) => {
        this.posts.update((posts) =>
          posts.map((p) => (p.id === id ? post : p))
        );
      })
    );
  }

  getPostByUsername(username: string): Observable<Post[]> {
    const posts = this.posts().filter((x) => x.userName === username);
    if (posts.length > 0) return of(posts);

    return this.http.get<Post[]>(`${this.baseUrl}posts/user/${username}`);
  }

  addPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}posts/add-post`, postData);
  }

  updatePost(id: number, postData: FormData) {
    return this.http.put(`${this.baseUrl}posts/edit-post/${id}`, postData).pipe(
    );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}posts/delete-post/${id}`);
  }
}