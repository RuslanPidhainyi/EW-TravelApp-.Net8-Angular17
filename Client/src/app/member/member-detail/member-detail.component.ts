import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../_models/post';
import { PostsService } from '../../_services/posts.service';
import { MemberOfferCardComponent } from "../member-offer-card/member-offer-card.component";
import { TimeagoModule, TimeagoPipe } from 'ngx-timeago';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule, MemberOfferCardComponent, TimeagoModule, DatePipe],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss',
})
export class MemberDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  private postService = inject(PostsService);
  member?: Member;
  images: GalleryItem[] = [];
  posts: Post[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        member.generalPhotos.map((p) => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
        });

        this.postService.getPostByUsername(username).subscribe({
          next: (posts) => {
            this.posts = posts;
          },
        });
      },
    });
  }
}
