import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../_models/post';
import { PostsService } from '../../_services/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-profile-offer-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-profile-offer-card.component.html',
  styleUrl: './member-profile-offer-card.component.scss',
})
export class MemberProfileOfferCardComponent {
  private postsService = inject(PostsService);
  private toastr = inject(ToastrService);
  postE = input.required<Post>();
  @Input() post!: Post;
  @Output() postDeleted = new EventEmitter<number>();

  deletePost(post: Post) {
    this.postsService.deletePost(post).subscribe({
      next: (_) => {
        this.toastr.success('Post deleted successfully');
        this.postDeleted.emit(post.id);
      },
      error: () => {
        this.toastr.error('Failed to deleted post');
      }
    });
  }
}
