import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../_services/account.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { PostsService } from '../../_services/posts.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TextInputPostComponent } from "../../_forms/text-input-post/text-input-post.component";
import { TextTextareaPostComponent } from "../../_forms/text-textarea-post/text-textarea-post.component";
import { CheckboxInputPostComponent } from "../../_forms/checkbox-input-post/checkbox-input-post.component";
import { NumberInputPostComponent } from "../../_forms/number-input-post/number-input-post.component";

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe,  RouterLink, TextInputPostComponent, TextTextareaPostComponent, CheckboxInputPostComponent,NumberInputPostComponent ],
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  private accountService = inject(AccountService);
  private postService = inject(PostsService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  postForm: FormGroup = new FormGroup({});
  uploader?: FileUploader;
  validationErrors: string[] | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  ngOnInit(): void {
    this.initializeForm();
    this.initializeUploader();
  }

  initializeForm() {
    this.postForm = this.fb.group({
          title: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(30)
          locationCountry: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(50)
          locationCity: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(50)
          lastCountry: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(50)
          lastCity: ['', Validators.required], //TODO: Validators.minLength(2), Validators.maxLength(50)
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
          currency: ['', Validators.required], //TODO: Validators.minLength(1), Validators.maxLength(30)
          description: [''],
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'posts/add-post',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      console.log('Photo uploaded successfully', response);
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  onSubmit(): void {
    if (this.postForm.valid) {
      const formData = new FormData();

      Object.keys(this.postForm.controls).forEach((key) => {
        const value = this.postForm.get(key)?.value;
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (this.uploader && this.uploader.queue.length > 0) {
        const fileItem = this.uploader.queue[0]._file;
        formData.append('file', fileItem, fileItem.name);
      } else {
        console.error('No file selected or uploader is undefined');
        return;
      }

      this.postService.addPost(formData).subscribe({
        next: (response) => {
          console.log('Post added successfully', response);
          this.toastr.success('Post added successfully');
          this.router.navigateByUrl('/member/profile');
        },
        error: (error) => {
          console.error('Error adding post', error);
          this.validationErrors = error;
          this.toastr.error('Failed to added post');
        },
      });
    }
  }
}