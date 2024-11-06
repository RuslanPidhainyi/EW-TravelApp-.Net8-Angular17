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

  getPosts() {
    return this.http.get<Post[]>(this.baseUrl + 'posts').subscribe({
      next: (posts) => this.posts.set(posts),
    });
  }

  // getPostById(id: number) {
  //   const post = this.posts().find((x) => x.id === id);
  //   if (post !== undefined) return of(post);

  //   return this.http.get<Post>(this.baseUrl + 'posts/' + id);
  // }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}posts/${id}`).pipe(
      tap((post) => {
        this.posts.update((posts) =>
          posts.map((p) => (p.id === id ? post : p))
        );
      })
    );
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

  // addPost(postData: FormData): Observable<Post> {
  //   return this.http.post<Post>(`${this.baseUrl}posts/add-post`, postData).pipe(
  //     tap((newPost) => {
  //       // Додаємо новий пост на початок списку `posts`
  //       this.posts.update((posts) => [newPost, ...posts]);
  //     })
  //   );
  // }

  // addPost(postData: FormData): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}posts/add-post`, postData).pipe(
  //     // tap(() => {
  //     //   // Оновити список постів, якщо потрібно
  //     // })
  //     tap((newPost) => {
  //       // Додаємо новий пост до сигналу `posts`
  //       this.posts.update((posts) => [newPost, ...posts]);
  //     })
  //   );
  // }

  ///////////////////
  // updatePost(id: number, postData: FormData): Observable<any> {
  //   return this.http.put<any>(`${this.baseUrl}posts/edit-post/${id}`, postData);
  // }

  // // Метод для оновлення кешованого поста в сигналі `posts`
  // updateCachedPost(updatedPost: Post) {
  //   const updatedPosts = this.posts().map((post) =>
  //     post.id === updatedPost.id ? updatedPost : post
  //   );
  //   this.posts.set(updatedPosts);
  // }

  //////////////////////

  // updatePost(id: number, post: Post) {
  //   return this.http
  //     .put(`${this.baseUrl}posts/edit-post/${post.id}`, post)
  //     .pipe(
  //       tap(() => {
  //         // Оновити список постів, якщо потрібно
  //       })
  //     );
  // }

  updatePost(id: number, postData: FormData) {
    return this.http.put(`${this.baseUrl}posts/edit-post/${id}`, postData).pipe(
      tap(() => {
        // Оновити список постів, якщо потрібно
      })
    );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}posts/delete-post/${id}`);
  }
}
