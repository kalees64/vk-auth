import { Injectable } from '@angular/core';
import { loadGapiInsideDOM } from 'gapi-script';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private authInstance!: gapi.auth2.GoogleAuth;

  constructor() {}

  async initialize(clientId: string): Promise<void> {
    await loadGapiInsideDOM();
    await new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        gapi.auth2
          .init({ client_id: clientId })
          .then((auth) => {
            this.authInstance = auth as gapi.auth2.GoogleAuth; // Explicit type assertion
            resolve(true);
          })
          .catch(reject);
      });
    });
  }

  signIn(): Promise<gapi.auth2.GoogleUser> {
    return this.authInstance.signIn();
  }

  signOut(): Promise<void> {
    return this.authInstance.signOut();
  }

  isSignedIn(): boolean {
    return this.authInstance.isSignedIn.get();
  }

  getUser(): gapi.auth2.GoogleUser | null {
    return this.isSignedIn() ? this.authInstance.currentUser.get() : null;
  }
}
