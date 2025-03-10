import { Component, computed, inject, input } from '@angular/core';
import { Post } from '../../_models/post';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../_services/likes.service';

@Component({
  selector: 'app-member-offer-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-offer-card.component.html',
  styleUrl: './member-offer-card.component.scss'
})
export class MemberOfferCardComponent {
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

