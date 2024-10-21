import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { PostsService } from '../../_services/posts.service';
import { Member } from '../../_models/member';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Post } from '../../_models/post';
import { MemberOfferCardComponent } from '../member-offer-card/member-offer-card.component';
import { RouterLink } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-edit-profile',
  standalone: true,
  imports: [TabsModule, FormsModule,  MemberOfferCardComponent, GalleryModule, RouterLink],
  templateUrl: './member-edit-profile.component.html',
  styleUrl: './member-edit-profile.component.scss'
})
export class MemberEditProfileComponent implements OnInit{
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private postService = inject(PostsService);
  member?: Member;
  images: GalleryItem[] = [];
  posts: Post[] = [];

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if(!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => {
        this.member = member;
        member.generalPhotos.map((p) => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
        });

        this.postService.getPostByUsername(member.username).subscribe({
          next: (posts) => {
            this.posts = posts;
          },
        });
      },
    })
  }
}