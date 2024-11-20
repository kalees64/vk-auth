import { Component } from '@angular/core';
import { HasRoleDirective } from '../../../../projects/auth/src/public-api';
import { DisableIfNoRoleDirective } from '../../../../projects/auth/src/lib/disableIfNoRole.directive';
import { DisableLinkIfNoRoleDirective } from '../../../../projects/auth/src/lib/disableLinkIfNoRole.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DisableIfNoRoleDirective,
    HasRoleDirective,
    DisableLinkIfNoRoleDirective,
    RouterLink,
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
      roles: ['USER'],
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('roles', JSON.stringify(user.roles));
  }

  clearUserDataFromLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
  }
}
