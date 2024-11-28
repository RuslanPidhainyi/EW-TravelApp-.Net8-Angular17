import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';

export const redirectAuthenticatedGuard: CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);
    const router = inject(Router);

    if (accountService.currentUser()) {
        router.navigate(['/offers']);
        return false;
    } 
    
    return true;
};