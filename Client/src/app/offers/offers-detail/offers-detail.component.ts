import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../_services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../_models/post';

@Component({
  selector: 'app-offers-detail',
  standalone: true,
  imports: [],
  templateUrl: './offers-detail.component.html',
  styleUrl: './offers-detail.component.scss'
})
export class OffersDetailComponent implements OnInit {
  private postService = inject(PostsService);
  private route = inject(ActivatedRoute);
  post?: Post;

  ngOnInit(): void {
    this.loadPost()
  }

  loadPost() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.postService.getPost(id).subscribe({
      next: post => this.post = post,
    });
  } 
}
