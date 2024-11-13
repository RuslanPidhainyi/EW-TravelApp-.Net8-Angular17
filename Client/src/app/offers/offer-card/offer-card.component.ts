import { Component, computed, inject, input } from '@angular/core';
import { Post } from '../../_models/post';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../_services/likes.service';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss'
})
export class OfferCardComponent {
  private likeService = inject(LikesService);
  post = input.required<Post>();
  hasLiked = computed(() => this.likeService.likeIds().includes(this.post().id)); //note: Computed - signal obliczalny. Gdy chcemy obliczyć wartosc na podstawie innego sygnalu wykorz "Computed" signal.

  toggleLike() {
    this.likeService.toggleLike(this.post().id).subscribe({
      next: () => {
        if(this.hasLiked()) {
          this.likeService.likeIds.update(ids => ids.filter(x => x !== this.post().id));
        }
        else {
          this.likeService.likeIds.update(ids => [...ids, this.post().id])
        }
      }
    })
  }
}