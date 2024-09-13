import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthStoreService } from '../stores/auth.store';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authStoreService = inject(AuthStoreService);
  const router = inject(Router);

  if (!authStoreService.isLoggedIn()) {
    const loginUrlTree = router.parseUrl('/login');
    return new RedirectCommand(loginUrlTree);
  }

  return true;
};
