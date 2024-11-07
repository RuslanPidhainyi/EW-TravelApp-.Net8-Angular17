// import { Component, inject, input, OnInit, output } from '@angular/core';
// import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
// import { AccountService } from '../_services/account.service';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { JsonPipe, NgFor, NgIf } from '@angular/common';
// import { TextInputComponent } from "../_forms/text-input/text-input.component";

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, JsonPipe, NgIf, NgFor, TextInputComponent],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss',
// })
// export class RegisterComponent implements OnInit {
//   private accountService = inject(AccountService);
//   private router = inject(Router);
//   private toastr = inject(ToastrService);
//   private fb = inject(FormBuilder);
//   cancleRegister = output<boolean>();
//   model: any = {};
//   registerForm: FormGroup = new FormGroup({});
//   // errorMessages: any = {};

//   ngOnInit(): void {
//     this.initializeForm();
//   }

//   initializeForm() {
//     this.registerForm = this.fb.group({
//       gender: ['male'],
//       username: ['', Validators.required],
//       knownAs: ['', Validators.required],
//       dateOfBirth: ['', Validators.required],
//       password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
//       confirmPassword: ['', [Validators.required, this.matchValues('password')]],
//     });
//     this.registerForm.controls['password'].valueChanges.subscribe({
//       next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
//     });
//   }

//   matchValues(matchTo: string): ValidatorFn {
//     return(control: AbstractControl) => {
//       return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
//     }
//   }

//   register() {
//     console.log(this.registerForm.value);
//     // this.accountService.register(this.model).subscribe({
//     //   next: (response) => {
//     //     console.log(response);
//     //     this.router.navigateByUrl('/offers');
//     //     this.cancel();
//     //   },
//     //   error: (error) => this.toastr.error(error.error),
//     // });
//   }

//   // register() {
//   //   this.accountService.register(this.model).subscribe({
//   //     next: (response) => {
//   //       console.log(response);
//   //       this.router.navigateByUrl('/offers');
//   //       this.cancel();
//   //     },
//   //     error: (error) => {
//   //       //console.log('Error:', error);

//   //       if (error.error && error.error.errors) {
//   //         this.errorMessages = error.error.errors;
//   //       } else {
//   //         this.toastr.error('An unexpected error occurred');
//   //       }
//   //     }
//   //   });
//   // }

//   cancel() {
//     this.cancleRegister.emit(false);
//   }
// }

import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  output,
  Output,
} from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    TextInputComponent,
    DatePickerComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  cancleRegister = output<boolean>();
  maxDate: Date = new Date();

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      gender: ['male'],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(21),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      },
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({ dateOfBirth: dob });
    this.accountService.register(this.registerForm.value).subscribe({
      next: (_) => this.router.navigateByUrl('/offers'),
      error: (error) => (this.validationErrors = error),
    });
  }

  cancel() {
    this.cancleRegister.emit(false);
  }

  getDateOnly(dateOfBirth: string | undefined) {
    if (!dateOfBirth) {
      return;
    }

    let dateOfdob = new Date(dateOfBirth);

    return new Date(
      dateOfdob.setMinutes(
        dateOfdob.getMinutes() - dateOfdob.getTimezoneOffset()
      )
    )
      .toISOString()
      .slice(0, 10);
  }
}
