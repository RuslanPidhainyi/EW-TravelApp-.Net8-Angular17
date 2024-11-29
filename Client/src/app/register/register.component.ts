import { Component, EventEmitter, inject, OnInit, output, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';
import { TextUtils } from '../helpers/TextUtils';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule, TextInputComponent, DatePickerComponent ],
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
      password: ['',[ Validators.required, Validators.minLength(9), Validators.maxLength(21)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      },
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true };
    };
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({ dateOfBirth: dob });
    
    this.accountService.register(this.registerForm.value).subscribe({
      next: (_) => {
        this.router.navigateByUrl('/offers');
        const username = TextUtils.titleCase(this.accountService.currentUser()?.username || '');
        this.toastr.success(`User ${username} registered successfully`);
      },
      error: (error) => {
        this.validationErrors = error;
        this.toastr.error('Failed to register');
      },
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
    ).toISOString().slice(0, 10);
  }
}