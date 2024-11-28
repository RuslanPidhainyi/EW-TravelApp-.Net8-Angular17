import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../_models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../_models/post';
import { PostsService } from '../../_services/posts.service';
import { MemberOfferCardComponent } from '../member-offer-card/member-offer-card.component';
import { TimeagoModule, TimeagoPipe } from 'ngx-timeago';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { PresenceService } from '../../_services/presence.service';
import { AccountService } from '../../_services/account.service';
import { HubConnectionState } from '@microsoft/signalr';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    GalleryModule,
    MemberOfferCardComponent,
    TimeagoModule,
    DatePipe,
    MemberMessagesComponent,
  ],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss',
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs') memberTabs?: TabsetComponent;
  private messageService = inject(MessageService);
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private postService = inject(PostsService);
  private accountService = inject(AccountService);
  presenceService = inject(PresenceService);
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  posts: Post[] = [];
  activeTab?: TabDirective;
  //messages: Message[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  selectTab(heading: string)
  {
    if(this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading);
      if(messageTab) messageTab.active = true;
    }
  }

  // onUpdateMessage(event: Message) {
  //   this.messages.push(event);
  // }

  onRouteParamsChange()
  {
    const user =this.accountService.currentUser();
    if(!user) return;
    if(this.messageService.hubConnection?.state === HubConnectionState.Connected  && this.activeTab?.heading === 'Messages')
    {
      this.messageService.hubConnection.stop().then(() => {
        this.messageService.createHubConnection(user, this.member.username)
      })
    }
  }

  OnTabActived(data: TabDirective) {
    // this.activeTab = data;
    // if (
    //   this.activeTab.heading === 'Messages' &&
    //   this.messages.length === 0 &&
    //   this.member
    // ) {
    //   this.messageService.getMessageThread(this.member.username).subscribe({
    //     next: (messages) => (this.messages = messages),
    //   });
    // }
    this.activeTab = data;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tab: this.activeTab.heading},
      queryParamsHandling: 'merge'
    })
    if (
      this.activeTab.heading === 'Messages' &&
      this.member
    ) {
      const user = this.accountService.currentUser();
      if(!user) return;
      this.messageService.createHubConnection(user, this.member.username);   
    } else {
      this.messageService.stopHubConnection();   
    }
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        member.generalPhotos.map((p) => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
        });

        this.postService.getPostByUsername(username).subscribe({
          next: (posts) => {
            this.posts = posts;
          },
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
