import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);

  //Methods inside Service
  /*
    NazwaMetody( pzrejmuje argument "model" z danymi dla autorization - czyli "model" to jest Object z wlasciwosciami Username && Password ) {
      
      return this.http.post<User>(this.baseUrl + 'account/login', model); – Ten wiersz wysyła żądanie POST na serwer z danymi model, i oczekuje, że serwer zwróci obiekt typu User. Dzięki generykowi <User> otrzymujesz prawidłową typizację odpowiedzi na Kliencie
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
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}