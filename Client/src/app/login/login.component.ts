import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { RegisterComponent } from '../register/register.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TextUtils } from '../helpers/TextUtils';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  registerMode = false;
  model: any = {};
  showPassword: boolean = false;

  //note: Methods inside component.ts
  /*
    model: any = {} //Za pomocy tego "model" otrzymujemo wartosc z inputów z componenta.html i wykorzystamy w naszych metodach  

    NazwaMetody() {
      
      this.accountService.login(this.model).subscribe - Z Servica wywołujemy .metode (przekazujemy argument "model").subscrabe - bez subscribu nasza metoda bedzie leniwa
      ({
        next: (response) => {

          //w block "Next" wrzycamy co musi zrobic nasza metoda

          console.log(respoonse);
          loggedIn = true;
        }
        error: () => {
          
          //w block "error" wrzycamy co musi zrobic nasza metoda, jesli nie wyrobi block "Next", czyli kiedy mamy błąd

          error: error => console.log(error)
        }
      }) 
    }
  */

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/offers');
        const username = TextUtils.titleCase(
          this.accountService.currentUser()?.username || ''
        );
        this.toastr.success(`User ${username} logged in successfully`);
      },
      error: () => {
        this.toastr.error('Failed to login');
      },
    });
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}