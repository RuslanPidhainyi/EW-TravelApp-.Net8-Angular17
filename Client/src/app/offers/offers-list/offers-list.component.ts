import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../_services/posts.service';
import { Post } from '../../_models/post';
import { OfferCardComponent } from '../offer-card/offer-card.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-offers-list',
  standalone: true,
  imports: [OfferCardComponent, NgIf],
  templateUrl: './offers-list.component.html',
  styleUrl: './offers-list.component.scss',
})
export class OffersListComponent implements OnInit {
  postService = inject(PostsService);

  ngOnInit(): void {
    if(this.postService.posts().length === 0) this.loadMembers();
  }
  loadMembers() {
    this.postService.getPosts();
  }
}