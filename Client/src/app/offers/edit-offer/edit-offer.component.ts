// import { Component, inject, OnInit } from '@angular/core';
// import {
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { PostsService } from '../../_services/posts.service';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { Post } from '../../_models/post';
// import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
// import { FileUploadModule } from 'ng2-file-upload';

// @Component({
//   selector: 'app-edit-offer',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     NgIf,
//     NgFor,
//     NgStyle,
//     NgClass,
//     FileUploadModule,
//     DecimalPipe,
//     RouterLink,
//   ],
//   templateUrl: './edit-offer.component.html',
//   styleUrl: './edit-offer.component.scss',
// })
// export class EditOfferComponent implements OnInit {
//   private postService = inject(PostsService);
//   private router = inject(Router);
//   private route = inject(ActivatedRoute);
//   postForm: FormGroup = new FormGroup({});
//   postId!: number;
//   post: Post | null = null;

//   ngOnInit(): void {
//     this.postId = +this.route.snapshot.paramMap.get('id')!; //note: Otrzymujemy parametr Id z URL dla edytowania naszego Post'u
//     this.loadPostData();
//   }

//   // loadPostData() {
//   //   this.postService.getPostById(this.postId).subscribe((post) => {
//   //     this.post = post;
//   //   }); //note: otrzymujemy dane postu po jego Id
//   //   this.initializeForm(this.post!);
//   // }

//   loadPostData() {
//     this.postService.getPostById(this.postId).subscribe((post) => {
//       if (post) {
//         this.post = post;
//         this.initializeForm(this.post);
//       }
//     });
//   }

//   initializeForm(post: Post) {
//     this.postForm = new FormGroup({
//       title: new FormControl(post.title, Validators.required),
//       locationCountry: new FormControl(
//         post.locationCountry,
//         Validators.required
//       ),
//       locationCity: new FormControl(post.locationCity, Validators.required),
//       lastCountry: new FormControl(post.lastCountry),
//       lastCity: new FormControl(post.lastCity),
//       typePlaceStay: new FormControl(post.typePlaceStay),
//       localTransport: new FormControl(post.localTransport),
//       entranceFee: new FormControl(post.entranceFee),
//       placeStay: new FormControl(post.placeStay),
//       groceryStore: new FormControl(post.groceryStore),
//       guide: new FormControl(post.guide),
//       travelTime: new FormControl(post.travelTime, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       minPriceLocalTrans: new FormControl(post.minPriceLocalTrans, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       maxPriceLocalTrans: new FormControl(post.maxPriceLocalTrans, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       minPriceEntrFee: new FormControl(post.minPriceEntrFee, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       maxPriceEntrFee: new FormControl(post.maxPriceEntrFee, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       minPricePlaceStay: new FormControl(post.minPricePlaceStay, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       maxPricePlaceStay: new FormControl(post.maxPricePlaceStay, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       minPriceGroceryStore: new FormControl(post.minPriceGroceryStore, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       maxPriceGroceryStore: new FormControl(post.maxPriceGroceryStore, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       minPriceGuide: new FormControl(post.minPriceGuide, [
//         Validators.required,
//         Validators.min(0),
//       ]),
//       currency: new FormControl(post.currency, Validators.required),
//       description: new FormControl(post.description),
//     });
//   }

//   // onSubmit(): void {
//   //   if (this.postForm.valid) {
//   //     const formData = new FormData();

//   //     Object.keys(this.postForm.controls).forEach((key) => {
//   //       const value = this.postForm.get(key)?.value;
//   //       if (value !== undefined && value !== null) {
//   //         formData.append(key, value);
//   //       }
//   //     });

//   //     this.postService.updatePost(this.postId, formData).subscribe(
//   //       (response) => {
//   //         console.log('Post updated successfully', response);
//   //         this.router.navigate(['/member/profile']);
//   //       },
//   //       (error) => {
//   //         console.error('Error updating post', error);
//   //       }
//   //     );
//   //   }
//   // }

//   onSubmit(): void {
//     if (this.postForm.valid) {
//       const formData = new FormData();

//       Object.keys(this.postForm.controls).forEach((key) => {
//         const value = this.postForm.get(key)?.value;
//         if (value !== undefined && value !== null) {
//           formData.append(key, value);
//         }
//       });

//       // Перевірка вмісту formData
//       for (const pair of (formData as any).entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//       }

//       this.postService.updatePost(this.postId, formData).subscribe(
//         (response) => {
//           console.log('Post updated successfully', response);
//           this.router.navigate(['/member/profile']);
//         },
//         (error) => {
//           console.error('Error updating post', error);
//         }
//       );
//     }
//   }
// }

//////////////////////////////////////////////////
// import {
//   Component,
//   HostListener,
//   inject,
//   OnInit,
//   ViewChild,
// } from '@angular/core';
// import { PostsService } from '../../_services/posts.service';
// import { AccountService } from '../../_services/account.service';
// import { Post } from '../../_models/post';
// import { FormsModule, NgForm } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { TabsModule } from 'ngx-bootstrap/tabs';

// // @Component({
// //   selector: 'app-edit-offer',
// //   standalone: true,
// //   imports: [
// //     ReactiveFormsModule,
// //     NgIf,
// //     NgFor,
// //     NgStyle,
// //     NgClass,
// //     FileUploadModule,
// //     DecimalPipe,
// //     RouterLink,
// //   ],
// //   templateUrl: './edit-offer.component.html',
// //   styleUrl: './edit-offer.component.scss',
// // })

// @Component({
//   selector: 'app-edit-offer',
//   standalone: true,
//   templateUrl: './edit-offer.component.html',
//   styleUrl: './edit-offer.component.scss',
//   imports: [
//     TabsModule,
//     FormsModule,
//   ],
// })
// export class EditOfferComponent implements OnInit {
//   @ViewChild('editForm') editForm?: NgForm;
//   @HostListener('window:beforeunload', ['$event']) notify($event: any) {
//     if (this.editForm?.dirty) {
//       $event.returnValue = true;
//     }
//   }
//   private accountService = inject(AccountService);
//   private postsService = inject(PostsService);
//   private toastr = inject(ToastrService);
//   private router = inject(Router);
//   post?: Post;

//   ngOnInit(): void {
//     this.loadPost();
//   }

//   loadPost() {
//     const user = this.accountService.currentUser();
//     if (!user) return;
//     this.postsService.getPostById(1).subscribe({
//       next: (post) => {
//         this.post = post;
//       },
//     });
//   }

//   updatePost() {
//     if (!this.post) return;
//     this.postsService.updatePost(this.post).subscribe({
//       next: (_) => {
//         this.toastr.success('Post updated successfully');
//         this.editForm?.reset(this.post);
//         this.router.navigate(['/member/profile']);
//       },
//       error: () => {
//         this.toastr.error('Failed to update post');
//       },
//     });
//   }
// }

import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PostsService } from '../../_services/posts.service';
import { AccountService } from '../../_services/account.service';
import { Post } from '../../_models/post';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-edit-offer',
  standalone: true,
  templateUrl: './edit-offer.component.html',
  styleUrl: './edit-offer.component.scss',
  imports: [TabsModule, FormsModule],
})
export class EditOfferComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  private accountService = inject(AccountService);
  private postsService = inject(PostsService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  post?: Post;
  postId!: number;

  ngOnInit(): void {
    // Retrieve post ID from URL parameters
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPost();
  }

  loadPost() {
    // Ensure the user is logged in and then fetch the post by ID
    const user = this.accountService.currentUser();
    if (!user) return;

    this.postsService.getPostById(this.postId).subscribe({
      next: (post) => {
        this.post = post;
      },
      error: () => {
        this.toastr.error('Failed to load post');
      },
    });
  }

  // updatePost() {
  //   if (!this.post) return;
  //   this.postsService.updatePost(this.post.id, this.post).subscribe({
  //     next: () => {
  //       this.toastr.success('Post updated successfully');
  //       this.editForm?.reset(this.post);
  //       this.router.navigate(['/member/profile']);
  //     },
  //     error: () => {
  //       this.toastr.error('Failed to update post');
  //     },
  //   });
  // }

  updatePost() {
    if (!this.post) return;
  
    const formData = new FormData();
    Object.keys(this.post).forEach(key => {
      const value = (this.post as any)[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
  
    this.postsService.updatePost(this.post.id, formData).subscribe({
      next: () => {
        this.toastr.success('Post updated successfully');
        this.editForm?.reset(this.post);
        this.router.navigate(['/member/profile']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.toastr.error('Failed to update post');
      },
    });
  }
  
}
