import { Component, inject, input } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [TimeagoModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss',
})
export class MemberMessagesComponent {
  private messageService = inject(MessageService);
  username = input.required<string>();
  messages = input.required<Message[]>();

  ngOnInit(): void {
  }
}
