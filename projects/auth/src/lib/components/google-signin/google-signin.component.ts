import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoogleAuthService } from '../../google-auth.service';

@Component({
  selector: 'vk-google-signin',
  standalone: true,
  imports: [],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.css',
})
export class GoogleSigninComponent {
  @Input() clientId!: string;
  @Input() buttonText = 'Login with Google';
  @Output() userAuthenticated = new EventEmitter<gapi.auth2.GoogleUser>();

  constructor(private authService: GoogleAuthService) {}

  async ngOnInit(): Promise<void> {
    await this.authService.initialize(this.clientId);
  }

  async onLoginClick(): Promise<void> {
    try {
      const user = await this.authService.signIn();
      this.userAuthenticated.emit(user);
    } catch (error) {
      console.error('Google Sign-In failed:', error);
    }
  }
}

// <google-login-button
//       [clientId]="'YOUR_GOOGLE_CLIENT_ID'"
//       (userAuthenticated)="onUserAuthenticated($event)">
//     </google-login-button>

// onUserAuthenticated(user: gapi.auth2.GoogleUser) {
//     console.log('User authenticated:', user);
//   }
