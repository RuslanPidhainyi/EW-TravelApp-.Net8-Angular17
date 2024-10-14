import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  http = inject(HttpClient);
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  registerMode = false;
  model: any = {};
  // model: any = {
  //   username: '',
  //   password: '',
  // };
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/offers');
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.error(error),
      complete: () => console.log('Request has completed'),
    });
  }
}
