import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { PostsService } from '../../_services/posts.service';
import { Post } from '../../_models/post';
import { RouterLink } from '@angular/router';
import { MemberProfileOfferCardComponent } from '../member-profile-offer-card/member-profile-offer-card.component';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe, NgClass } from '@angular/common';
import { switchMap, tap } from 'rxjs';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";

@Component({
  selector: 'app-member-profile',
  standalone: true,
  imports: [
    TabsModule,
    GalleryModule,
    RouterLink,
    MemberProfileOfferCardComponent,
    TimeagoModule,
    DatePipe,
    MemberMessagesComponent, NgClass
],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.scss',
})
export class MemberProfileComponent implements OnInit {
  accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private postService = inject(PostsService);
  member?: Member;
  images: GalleryItem[] = [];
  posts: Post[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if (!user) return;

    // this.memberService.getMember(user.username).subscribe({
    //   next: (member) => {
    //     this.member = member;
    //     member.generalPhotos.map((p) => {
    //       this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
    //     });

    //     this.postService.getPostByUsername(member.username).subscribe((posts)=>
    //         this.posts = posts
    //     );
    //   },
    // });
    this.memberService.getMember(user.username).pipe(
      tap(((member) => {
        this.member = member;
        member.generalPhotos.map((p) => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
        });
  })),
      switchMap(member=> this.postService.getPostByUsername(member.username))
    ).subscribe((posts)=>this.posts = posts)
  }

  onPostDeleted(postId: number) {
    // Видаляємо пост зі списку без оновлення сторінки
    this.posts = this.posts.filter((post) => post.id !== postId);
  }
}
