import { Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../_services/likes.service';
import { Post } from '../_models/post';
import { OfferCardComponent } from "../offers/offer-card/offer-card.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [OfferCardComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit{
  private likesService = inject(LikesService);
  posts: Post[] = [];
  predicate = 'liked';
  
  ngOnInit(): void {
    this.loadLikes();
  }

  // getTitle() {
  //   if(this.predicate === 'liked') {
  //     return 'Posts you like';
  //   }
  // }

  loadLikes() {
    this.likesService.getLikes(this.predicate).subscribe({
      next: posts => this.posts = posts
    })
  }
}