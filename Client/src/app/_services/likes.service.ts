import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);

  toggleLike(postId: number) {
    return this.http.post(`${this.baseUrl}likes/${postId}`, {});
  }

  getLikes(predicate: string) {
    return this.http.get<Post[]>(`${this.baseUrl}likes?predicate=${predicate}`);
  }

  getLikeIds() {
    return this.http.get<number[]>(`${this.baseUrl}likes/list`).subscribe({
      next: ids => this.likeIds.set(ids),
    })
  }
}