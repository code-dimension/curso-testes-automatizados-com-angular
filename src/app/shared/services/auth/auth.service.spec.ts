import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { TokenResponse } from "../../interfaces/token.interface";
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('deve autenticar o usuário', fakeAsync(() => {
    const fakeEmail = 'correto@dominio.com';
    const fakePassword = '123456';

    let result: TokenResponse | null = null;

    service.login(fakeEmail, fakePassword)
      .subscribe(response => {
        result = response;
      })

    tick();

    const expectedResponse: TokenResponse = { token: 'fake-jwt-token' };

    expect(result).toEqual(expectedResponse);
  }));

  it('deve retornar um erro quando email ou senha estiver incorreto', fakeAsync(() => {
    const fakeEmail = 'errado@dominio.com';
    const fakePassword = '123';

    let result: HttpErrorResponse | null = null;

    service.login(fakeEmail, fakePassword)
      .subscribe({
        error: error => {
          result = error;  
        }
      })

    tick();

    expect((result as unknown as HttpErrorResponse).status).toBe(401);
  }));
});
