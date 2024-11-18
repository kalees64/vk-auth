import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../../projects/auth/src/lib/components/login/login.component';
import { RegisterComponent } from '../../projects/auth/src/public-api';
import { ForgotPasswordComponent } from '../../projects/auth/src/lib/components/forgot-password/forgot-password.component';
import { ActivateAccountComponent } from '../../projects/auth/src/lib/components/activate-account/activate-account.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ActivateAccountComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'vk-auth';
}
