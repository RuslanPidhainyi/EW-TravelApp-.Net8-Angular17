import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private likeService = inject(LikesService);
  baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);

  //Methods inside Service
  /*
    NazwaMetody( pzrejmuje argument "model" z danymi dla autorization - czyli "model" to jest Object z wlasciwosciami Username && Password ) {
      
      return this.http.post<User>(this.baseUrl + 'account/login', model); – Ten wiersz wysyła żądanie POST na serwer z danymi model, i oczekuje, że serwer zwróci obiekt typu User. Dzięki generykowi post<User> otrzymujesz prawidłową typizację odpowiedzi na Kliencie
    }
  */

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.likeService.getLikeIds();
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  roles = computed(() => {
    const user = this.currentUser();

    if(user && user.token) {
      const role = JSON.parse(atob(user.token.split('.')[1])).role
      return Array.isArray(role) ? role : [role];
    }

    return [];
  })
}