import { Component, computed, inject, OnInit, signal,} from '@angular/core';
import { PostsService } from '../../_services/posts.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../_models/post';
import { TitleCasePipe } from '@angular/common';
import { PresenceService } from '../../_services/presence.service';
import { LikesService } from '../../_services/likes.service';

@Component({
  selector: 'app-offer-detail',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './offer-detail.component.html',
  styleUrl: './offer-detail.component.scss',
})
export class OfferDetailComponent implements OnInit {
  private postService = inject(PostsService);
  private route = inject(ActivatedRoute);
  private presenceService = inject(PresenceService);
  private likeService = inject(LikesService);
  post = signal<Post | null>(null);

  hasLiked = computed(() => {
    const currentPost = this.post();
    return currentPost ? this.likeService.likeIds().includes(currentPost.id) : false;
  });

  isOnline = computed(() => {
    const currentPost = this.post();
    return currentPost ? this.presenceService.onlineUsers().includes(currentPost.userName) : false;
  });

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const numericId = Number(id);
    this.postService.getPostById(numericId).subscribe({
      next: (post) => this.post.set(post),
    });
  }

  toggleLike() {
    const currentPost = this.post();
    if (!currentPost) return;

    this.likeService.toggleLike(currentPost.id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likeIds.update((ids) =>
            ids.filter((x) => x !== currentPost.id)
          );
        } else {
          this.likeService.likeIds.update((ids) => [...ids, currentPost.id]);
        }
      },
    });
  }
}

// Modal window version  

// import { Component, inject, Input, OnInit } from '@angular/core';
// import { BsModalRef } from 'ngx-bootstrap/modal';
// import { PostsService } from '../../_services/posts.service';
// import { Post } from '../../_models/post';
// import { LikesService } from '../../_services/likes.service';
// import { PresenceService } from '../../_services/presence.service';
// import { TitleCasePipe } from '@angular/common';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-offer-detail',
//   standalone: true,
//   imports: [TitleCasePipe],
//   templateUrl: './offer-detail.component.html',
//   styleUrl: './offer-detail.component.scss',
// })
// export class OfferDetailComponent implements OnInit {
//   bsModalRef = inject(BsModalRef);
//   private postService = inject(PostsService);
//   private likeService = inject(LikesService);
//   private presenceService = inject(PresenceService);

//   @Input() postId!: number; // Отримує ID поста через модальне вікно
//   post: Post | null = null;

//   hasLiked = () => this.post && this.likeService.likeIds().includes(this.post.id);
//   isOnline = () => this.post && this.presenceService.onlineUsers().includes(this.post.userName);

//   ngOnInit(): void {
//     this.loadPost();
//   }

//   loadPost() {
//     this.postService.getPostById(this.postId).subscribe({
//       next: (post) => (this.post = post),
//       error: (err) => console.error('Failed to load post:', err),
//     });
//   }

//   toggleLike() {
//     if (!this.post) return;

//     this.likeService.toggleLike(this.post.id).subscribe(() => {
//       if (this.hasLiked()) {
//         this.likeService.likeIds.update((ids) => ids.filter((x) => x !== this.post!.id));
//       } else {
//         this.likeService.likeIds.update((ids) => [...ids, this.post!.id]);
//       }
//     });
//   }

//   closeModal() {
//     this.bsModalRef.hide();
//   }
// }
