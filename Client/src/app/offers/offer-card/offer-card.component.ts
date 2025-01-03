import { Component, computed, inject, input } from '@angular/core';
import { Post } from '../../_models/post';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../_services/likes.service';
import { PresenceService } from '../../_services/presence.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { OfferDetailComponent } from '../offer-detail/offer-detail.component';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss'
})
export class OfferCardComponent {
  private likeService = inject(LikesService);
  private presenceService = inject(PresenceService);
  // private modalService = inject(BsModalService);
  post = input.required<Post>();
  hasLiked = computed(() => this.likeService.likeIds().includes(this.post().id)); //note: Computed - signal obliczalny. Gdy chcemy obliczyć wartosc na podstawie innego sygnalu wykorz "Computed" signal.
  isOnline = computed(() => this.presenceService.onlineUsers().includes(this.post().userName)); 

  // bsModalRef: BsModalRef<OfferDetailComponent> = new BsModalRef<OfferDetailComponent>();

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

  
// Modal window version  

  // openPostModal(postId: number) {
  //   const initialState: ModalOptions = {
  //     class: 'modal-lg',
  //     initialState: {
  //       postId: postId
  //     }
  //   }
  //   this.bsModalRef = this.modalService.show(OfferDetailComponent, initialState);
  // }
}