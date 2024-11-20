import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HasRoleDirective } from '../../projects/auth/src/public-api';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HasRoleDirective, HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'vk-auth';

  saveDataToLocalStorage() {
    const user = {
      id: 1,
      name: 'Kalees',
      email: 'kalees@gmail.com',
      roles: ['ADMIN'],
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('roles', JSON.stringify(user.roles));
  }

  clearUserDataFromLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
  }
}
