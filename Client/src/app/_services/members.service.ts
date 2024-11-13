import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';
import { GeneralPhoto } from '../_models/generalPhoto';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);
  memberCashe = new Map();

  /*
    return this.http.get<Member[]>(this.baseUrl + 'users') 
      - wykorzystam .get<Member[]> zebys otrzymać z api liste User`ów

    .subscribe({
      next: (members) => this.members.set(members),
    });
      - subscribuje zebyś moglismy pobrać dane z API
  */
  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
      next: (members) => this.members.set(members),
    });
  }

  getMember(username: string) {
    const member: Member = [...this.memberCashe.values()]
      .reduce((arr, elem) => arr.concat(elem.body), [])
      .find((m: Member) => m.username  === username);

      if(member) return of(member);
    // const member = this.members().find((x) => x.username === username);
    // if (member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      tap(() => {
        this.members.update((members) =>
          members.map((m) => (m.username == member.username ? member : m))
        );
      })
    );
  }

  setMainPhoto(photo: GeneralPhoto) {
    return this.http
      .put(this.baseUrl + 'users/set-main-photo/' + photo.id, {})
      .pipe(
        tap(() => {
          this.members.update((members) =>
            members.map((m) => {
              if (m.generalPhotos.includes(photo)) {
                m.generalPhotoUrl = photo.url;
              }
              return m;
            })
          );
        })
      );
  }

  deletePhoto(photo: GeneralPhoto) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id).pipe(
      tap(() => {
        this.members.update(members => members.map(m => {
          if (m.generalPhotos.includes(photo)) {
            m.generalPhotos = m.generalPhotos.filter(x => x.id !== photo.id)
          }
          return m
        }))
      })
    );
  }
}