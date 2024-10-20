import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getPosts() {
    return this.http.get<Post[]>(
      this.baseUrl + 'posts');
  }

  getPost(username: string) {
    return this.http.get<Post>(
      this.baseUrl + 'posts/' + username);
  }

  getPostByUsername(username: string) {
    return this.http.get<Post[]>(`${this.baseUrl}posts/user/${username}`);
  }
}