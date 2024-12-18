import {
  Component, HostListener, inject, OnInit, ViewChild,
} from '@angular/core';
import { PostsService } from '../../_services/posts.service';
import { AccountService } from '../../_services/account.service';
import { Post } from '../../_models/post';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { TextInputPostComponent } from '../../_forms/text-input-post/text-input-post.component';
import { TextTextareaPostComponent } from '../../_forms/text-textarea-post/text-textarea-post.component';
import { CheckboxInputPostComponent } from '../../_forms/checkbox-input-post/checkbox-input-post.component';
import { NumberInputPostComponent } from '../../_forms/number-input-post/number-input-post.component';

@Component({
  selector: 'app-edit-offer',
  standalone: true,
  templateUrl: './edit-offer.component.html',
  styleUrl: './edit-offer.component.scss',
  imports: [TabsModule, FormsModule, ReactiveFormsModule, TextInputPostComponent, TextTextareaPostComponent,NumberInputPostComponent],
})
export class EditOfferComponent implements OnInit {
  // @ViewChild('editForm') editForm?: NgForm;
  // @HostListener('window:beforeunload', ['$event']) notify($event: any) {
  //   if (this.editForm?.dirty) {
  //     $event.returnValue = true;
  //   }
  // }

  private accountService = inject(AccountService);
  private postsService = inject(PostsService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  editForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  post?: Post;
  postId!: number;

  ngOnInit(): void {
    // Retrieve post ID from URL parameters
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadPost();
  }

  loadPost() {
    // Ensure the user is logged in and then fetch the post by ID
    const user = this.accountService.currentUser();
    if (!user) return;

    this.postsService.getPostById(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        this.editForm.patchValue(post); // Заповнюємо форму початковими значеннями
      },
      error: () => {
        this.toastr.error('Failed to load post');
      },
    });
  }

  initializeForm() {
    this.editForm = this.fb.group({
      title: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(30)
      locationCountry: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(50)
      locationCity: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(50)
      lastCountry: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(50)
      lastRegion: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(50)
      localTransport: [false],
      minPriceLocalTrans: [0], //TODO: [Validators.min(1),Validators.max(999999)],
      maxPriceLocalTrans: [0], //TODO: [Validators.min(1),Validators.max(999999)],
      travelTime: [0], //[0, [Validators.min(1),Validators.max(9999)]],
      entranceFee: [false],
      minPriceEntrFee: [0], //TODO: [Validators.min(1),Validators.max(999999)],
      maxPriceEntrFee: [0], //TODO:[Validators.min(1),Validators.max(999999)],
      placeStay: [false],
      typePlaceStay: [''],
      minPricePlaceStay: [0], //TODO: [Validators.min(1),Validators.max(999999)],
      maxPricePlaceStay: [0], //TODO: [Validators.min(1),Validators.max(999999)],
      groceryStore: [false],
      minPriceGroceryStore: [0], //TODO: [Validators.min(1),Validators.max(999999)],
      maxPriceGroceryStore: [0], //TODO: [Validators.min(1),Validators.max(999999)],
      guide: [false],
      minPriceGuide: [0], //TODO: [Validators.min(1),Validators.max(999999)],
      maxPriceGuide: [0], //TODO: [Validators.min(1),Validators.max(999999)],

      // !!! TODO: Nie wymagane pole "currence" przy tworzeniu, JEZELI niezaznaczyłem choziac jeden z pól ktory wymaga pole "currence". taki Jak (localTransport, entranceFee, placeStay, groceryStore, guide),  to potzebno  zmienic na backen'dzie i front'edzie.
      currency: ['', Validators.required], //TODO: Validators.minLength(1), Validators.maxLength(30)
      description: [''],
    });
  }

  updatePost() {
    if (this.editForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.editForm.controls).forEach((key) => {
      const value = this.editForm.get(key)?.value;
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    this.postsService.updatePost(this.postId, formData).subscribe({
      next: () => {
        this.toastr.success('Post updated successfully');
        this.router.navigateByUrl('/member/profile');
      },
      error: (error) => {
        console.error('Error updating post', error);
        this.toastr.error('Failed to updated post');
      },
    });
  }
}
