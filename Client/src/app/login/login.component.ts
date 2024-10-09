import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  http = inject(HttpClient);
  accountService = inject(AccountService);
  registerMode = false; 
  model: any = {};
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error),
    })
  }
  
  registerToggle() {
    this.registerMode = !this.registerMode
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;  
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.error(error),
      complete: () => console.log('Request has completed'),
    });
  }
  
}
