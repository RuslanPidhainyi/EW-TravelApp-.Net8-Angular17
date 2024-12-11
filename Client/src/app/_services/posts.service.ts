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
  
  //postCashe = new Map();

  getPosts() {
    return this.http.get<Post[]>(this.baseUrl + 'posts').subscribe({
      next: (posts) => this.posts.set(posts),
    });
  }

  getPostById(postId: number) {
    return this.http.get<Post>(this.baseUrl + 'posts/' + postId)
  }

  getPostByUsername(postUsername: string) {
    return this.http.get<Post[]>(this.baseUrl + 'posts/user/'+ postUsername);
  }

  addPost(postData: FormData){
    return this.http.post<Post>(this.baseUrl + 'posts/add-post/', postData).pipe(
      tap((newPost) => {
        this.posts.update((posts) => [...posts, newPost]);
      })
    );
  }

  updatePost(id: number, postData: FormData) {
    return this.http.put<Post>(this.baseUrl + 'posts/edit-post/' + id, postData).pipe(
      tap((updatedPost) => {
        this.posts.update((posts) =>
          posts.map((post) => (post.id === id ? updatedPost : post))
        );
      })
    );
  }

  deletePost(post: Post) {
    return this.http.delete(this.baseUrl + 'posts/delete-post/' + post.id).pipe(
      tap(() => {
        this.posts.update(posts => posts.filter(p => p.id !== post.id));
      })
    );
  }  
}