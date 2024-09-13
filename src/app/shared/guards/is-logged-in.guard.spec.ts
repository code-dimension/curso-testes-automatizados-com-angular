import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter, Router } from '@angular/router';

import { isLoggedInGuard } from './is-logged-in.guard';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthStoreService } from '../stores/auth.store';
import { MockProvider } from 'ng-mocks';

@Component({
  selector: 'app-autheticated-route',
  template: '',
})
class FakeAutheticatedRouteComponent {}

@Component({
  selector: 'app-login',
  template: '',
})
class FakeLoginComponent {}

describe('isLoggedInGuard', () => {
  let authStoreService: AuthStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(AuthStoreService),
        provideRouter([
          {
            path: 'fake-route',
            canActivate: [isLoggedInGuard],
            component: FakeAutheticatedRouteComponent,
          },
          {
            path: 'login',
            component: FakeLoginComponent,
          },
        ]),
      ],
    });

    authStoreService = TestBed.inject(AuthStoreService);
  });

  describe('quando o usuário não estiver logado', () => {
    it('deve redirecionar para a rota de login', async () => {
      const location = TestBed.inject(Location);
      const router = TestBed.inject(Router);

      expect(location.path()).toBe('');

      (authStoreService.isLoggedIn as jest.Mock).mockReturnValue(false);

      await router.navigate(['fake-route']);

      expect(location.path()).toBe('/login');
    });
  });

  describe('quando o usuário estiver logado', () => {
    it('deve manter a nevegação', async () => {
      const location = TestBed.inject(Location);
      const router = TestBed.inject(Router);

      expect(location.path()).toBe('');

      (authStoreService.isLoggedIn as jest.Mock).mockReturnValue(true);

      await router.navigate(['fake-route']);

      expect(location.path()).toBe('/fake-route');
    });
  });
});
