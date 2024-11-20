import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  const requiredRoles = route.data?.['roles'] as string[];
  const userRoles = authService.getRoles();

  const hasRole = requiredRoles?.some((role) => userRoles.includes(role));

  if (hasRole) {
    return true;
  } else {
    router.navigate(['/']);
    toast.error('Access denied');
    return false;
  }
};
