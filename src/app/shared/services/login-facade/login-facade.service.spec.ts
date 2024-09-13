import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginFacadeService } from './login-facade.service';
import { MockProviders } from 'ng-mocks';
import { AuthService } from '../auth/auth.service';
import { AuthStoreService } from '../../stores/auth.store';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginFacadeService', () => {
  let service: LoginFacadeService;
  let authService: AuthService;
  let authStoreService: AuthStoreService; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProviders(AuthService, AuthStoreService)
      ]
    });

    service = TestBed.inject(LoginFacadeService);
    authService = TestBed.inject(AuthService);
    authStoreService = TestBed.inject(AuthStoreService);
  });

  it('deve autenticar o usuário', fakeAsync(() => {
    const fakeEmail = 'correto@dominio.com';
    const fakePassword = '123456';

    let result: boolean | null = null;

    (authService.login as jest.Mock).mockReturnValue(of({ token: 'fake-jwt-token' }));

    service.login(fakeEmail, fakePassword).subscribe(() => {
      result = true;
    });

    tick();

    expect(authService.login).toHaveBeenCalledWith(fakeEmail, fakePassword);

    expect(authStoreService.setAsLoggedIn).toHaveBeenCalled();

    expect(result).toBe(true);
  }));

  it('deve retornar um erro quando a autenticação falhar', fakeAsync(() => {
    const fakeEmail = 'errado@dominio.com';
    const fakePassword = '123';

    let result: HttpErrorResponse | null = null;

    (authService.login as jest.Mock).mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 401 }))
    );

    service.login(fakeEmail, fakePassword).subscribe({
      error: (response) => {
        result = response;
      }
    });

    tick();

    expect(authService.login).toHaveBeenCalledWith(fakeEmail, fakePassword);

    expect(authStoreService.setAsLoggedIn).not.toHaveBeenCalled();

    expect((result as unknown as HttpErrorResponse).status).toBe(401);
  }));
});
