import { Component, input } from '@angular/core';
import { Post } from '../../_models/post';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss'
})
export class OfferCardComponent {
  post = input.required<Post>();
}