import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { PostsService } from '../../_services/posts.service';
import { Post } from '../../_models/post';
import { OfferCardComponent } from "../offer-card/offer-card.component";

@Component({
  selector: 'app-offers-list',
  standalone: true,
  imports: [OfferCardComponent],
  templateUrl: './offers-list.component.html',
  styleUrl: './offers-list.component.scss'
})
export class OffersListComponent implements OnInit {
  private postService = inject(PostsService);
  posts: Post[] = [];

  ngOnInit(): void {  
    this.loadMembers();
  }
  loadMembers() {
    this.postService.getPosts().subscribe({
      next: posts => this.posts = posts
    })
  }
}