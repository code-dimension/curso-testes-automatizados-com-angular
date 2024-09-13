import { inject, Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { AuthStoreService } from '../../stores/auth.store';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginFacadeService {
  authStore = inject(AuthStoreService);
  authService = inject(AuthService);

  login(email: string, password: string) {
    return this.authService
      .login(email, password)
      .pipe(tap(() => this.authStore.setAsLoggedIn()));
  }
}
