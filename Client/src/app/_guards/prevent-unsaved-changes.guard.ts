import { CanDeactivateFn } from '@angular/router';
import { MemberEditProfileComponent } from '../member/member-edit-profile/member-edit-profile.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditProfileComponent> = (component) => {
  //const confirmService = inject(ConfirmService)

  if(component.editForm?.dirty){
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
  }
  
  return true;
};
