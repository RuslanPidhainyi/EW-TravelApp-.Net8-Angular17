import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;

  getPosts() {
    return this.http.get<Post[]>(
      this.baseUrl + 'posts',
      this.getHttpOptions()
    );
  }

  // getPost(username: string) {
  //   return this.http.get<Post>(
  //     this.baseUrl + 'post/' + username,
  //     this.getHttpOptions()
  //   );
  // }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountService.currentUser()?.token}`,
      }),
    };
  }
}