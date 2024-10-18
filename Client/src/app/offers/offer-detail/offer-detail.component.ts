import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../_services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../_models/post';

@Component({
  selector: 'app-offer-detail',
  standalone: true,
  imports: [],
  templateUrl: './offer-detail.component.html',
  styleUrl: './offer-detail.component.scss'
})
export class OfferDetailComponent implements OnInit {
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