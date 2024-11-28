import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { TextUtils } from '../Helpers/TextUtils';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, TitleCasePipe, HasRoleDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  model: any = {};
  showPassword: boolean = false; 

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/offers');
        const username = TextUtils.titleCase(this.accountService.currentUser()?.username || '');
        this.toastr.success(`User ${username} logged in successfully`);
      },
      error: () => {
        this.toastr.error('Failed to login');
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toastr.success(`User is logged out!`);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  } 
}