import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../_models/post';
import { PostsService } from '../../_services/posts.service';

@Component({
  selector: 'app-member-profile-offer-card',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './member-profile-offer-card.component.html',
  styleUrl: './member-profile-offer-card.component.scss',
})
export class MemberProfileOfferCardComponent {
  private postsService = inject(PostsService);
  private router = inject(Router);
  postE = input.required<Post>();
  @Input() post!: Post;
  @Output() postDeleted = new EventEmitter<number>();

  deletePost() {
    const post = this.postE(); // Retrieve the post from the signal
    if (post && confirm('Are you sure you want to delete this post?')) {
      this.postsService.deletePost(post.id).subscribe({
        next: () => {
          console.log('Post deleted successfully');
          // Reload the list or update the parent component if needed
        },
        error: (err) => {
          console.error('Error deleting post:', err);
        },
      });
    }
  }
}
