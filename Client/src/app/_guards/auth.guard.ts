import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toaster = inject(ToastrService);

  if (accountService.currentUser()) {
    return true;
  } else {
    toaster.error('You shall not pass!');
    return false;
  }
};
