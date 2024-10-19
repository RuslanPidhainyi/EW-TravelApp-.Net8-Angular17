import { Component, input } from '@angular/core';
import { Post } from '../../_models/post';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-offer-card',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './member-offer-card.component.html',
  styleUrl: './member-offer-card.component.scss'
})
export class MemberOfferCardComponent {
  post = input.required<Post>();
}

