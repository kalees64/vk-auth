import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private token: string | null = localStorage.getItem('auth_token');
  private roles: string[] = JSON.parse(localStorage.getItem('roles') || '[]');

  getToken() {
    return this.token;
  }

  getRoles() {
    return this.roles;
  }

  isAuthenticated() {
    return this.token !== null;
  }

  getUserIdFromLocalStorage() {
    const res = localStorage.getItem('user');
    if (res) {
      return JSON.parse(res).id;
    }
  }
}
