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