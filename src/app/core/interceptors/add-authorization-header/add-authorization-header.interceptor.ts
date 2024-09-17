import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenManagerService } from 'src/app/shared/services/auth-token-manager/auth-token-manager.service';
import { AuthStoreService } from 'src/app/shared/stores/auth.store';

export const addAuthorizationHeaderInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const authStoreService = inject(AuthStoreService);

  if (authStoreService.isLoggedIn()) {
    const authTokenManagerService = inject(AuthTokenManagerService);

    const token = authTokenManagerService.getToken() as string;

    req = req.clone({
      headers: req.headers.set('Authorization', token),
    });
  }

  return next(req);
};
