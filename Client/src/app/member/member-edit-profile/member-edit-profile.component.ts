import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { PostsService } from '../../_services/posts.service';
import { Member } from '../../_models/member';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Post } from '../../_models/post';
import { MemberOfferCardComponent } from '../member-offer-card/member-offer-card.component';
import { RouterLink } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-edit-profile',
  standalone: true,
  imports: [ TabsModule, FormsModule, GalleryModule, PhotoEditorComponent, TimeagoModule],
  templateUrl: './member-edit-profile.component.html',
  styleUrl: './member-edit-profile.component.scss',
})
export class MemberEditProfileComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private postService = inject(PostsService);
  private toastr = inject(ToastrService);
  member?: Member;
  images: GalleryItem[] = [];
  posts: Post[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if (!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: (member) => {
        this.member = member;
        member.generalPhotos.map((p) => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
        });
      },
    });
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      },
    });
  }

  onMemberChange(event: Member) {
    this.member = event;
  }
}