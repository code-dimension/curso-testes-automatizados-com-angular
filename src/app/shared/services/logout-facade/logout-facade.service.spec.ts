import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LogoutFacadeService } from './logout-facade.service';
import { AuthStoreService } from '../../stores/auth.store';
import { MockProvider } from 'ng-mocks';
import { AuthTokenManagerService } from '../auth-token-manager/auth-token-manager.service';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  template: ''
})
class FakeLoginComponent {}

describe('LogoutFacadeService', () => {
  let service: LogoutFacadeService;
  let authStoreService: AuthStoreService;
  let authTokenManagerService: AuthTokenManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(AuthStoreService),
        MockProvider(AuthTokenManagerService), 
        provideRouter([
          {
            path: 'login',
            component: FakeLoginComponent
          }
        ])
      ],
    });
    service = TestBed.inject(LogoutFacadeService);
    authStoreService = TestBed.inject(AuthStoreService);
    authTokenManagerService = TestBed.inject(AuthTokenManagerService);
  });

  it('deve fazer o logout do usuário', fakeAsync(() => {
    const location = TestBed.inject(Location);

    expect(location.path()).toBe('');

    service.logout();

    expect(authStoreService.setAsLoggedOut).toHaveBeenCalled();
    expect(authTokenManagerService.removeToken).toHaveBeenCalled();

    tick();

    expect(location.path()).toBe('/login');
  }));
});
