/*
 * Public API Surface of auth
 */

export * from './lib/auth.service';
export * from './lib/auth.component';

export * from './lib/components/login/login.component';
export * from './lib/components/register/register.component';
export * from './lib/components/forgot-password/forgot-password.component';
export * from './lib/components/activate-account/activate-account.component';

export * from './lib/interceptors/auth.interceptor';
export * from './lib/guards/auth.guard';
export * from './lib/hasrole.directive';

export * from './lib/google-auth.service';
export * from './lib/components/google-signin/google-signin.component';
