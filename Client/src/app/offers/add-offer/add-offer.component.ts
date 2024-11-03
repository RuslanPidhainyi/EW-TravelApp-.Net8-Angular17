import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../_services/account.service';
import { environment } from '../../../environments/environment';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostsService } from '../../_services/posts.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe, RouterLink ],
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  private accountService = inject(AccountService);
  private postService = inject(PostsService);
  private router = inject(Router);
  postForm: FormGroup = new FormGroup({});
  uploader?: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  ngOnInit(): void {
    this.initializeForm();
    this.initializeUploader();
  }

  initializeForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      locationCountry: new FormControl('', Validators.required),
      locationCity: new FormControl('', Validators.required),
      lastCountry: new FormControl(''),
      lastCity: new FormControl(''),
      typePlaceStay: new FormControl(''),
      localTransport: new FormControl(false),
      entranceFee: new FormControl(false),
      placeStay: new FormControl(false),
      groceryStore: new FormControl(false),
      guide: new FormControl(false),
      travelTime: new FormControl(0, [Validators.required, Validators.min(0)]),
      minPriceLocalTrans: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      maxPriceLocalTrans: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      minPriceEntrFee: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      maxPriceEntrFee: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      minPricePlaceStay: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      maxPricePlaceStay: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      minPriceGroceryStore: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      maxPriceGroceryStore: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      minPriceGuide: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      currency: new FormControl('', Validators.required),
      description: new FormControl(''),
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

      this.postService.addPost(formData).subscribe(
        (response) => {
          console.log('Post added successfully', response);
          this.router.navigate(['/member/profile']);
        },
        (error) => {
          console.error('Error adding post', error);
        }
      );
    }
  }
}
