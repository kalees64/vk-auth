import { Component } from '@angular/core';
import { HasRoleDirective } from '../../../../projects/auth/src/public-api';
import { DisableIfNoRoleDirective } from '../../../../projects/auth/src/lib/disableIfNoRole.directive';
import { DisableLinkIfNoRoleDirective } from '../../../../projects/auth/src/lib/disableLinkIfNoRole.directive';
import { RouterLink } from '@angular/router';
import { GoogleSigninComponent } from '../../../../projects/auth/src/lib/components/google-signin/google-signin.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DisableIfNoRoleDirective,
    HasRoleDirective,
    DisableLinkIfNoRoleDirective,
    RouterLink,
    GoogleSigninComponent,
  ],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  saveDataToLocalStorage() {
    const user = {
      id: 1,
      name: 'Kalees',
      email: 'kalees@gmail.com',
      roles: ['ADMIN', 'USER'],
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('roles', JSON.stringify(user.roles));
  }

  clearUserDataFromLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
  }
}
