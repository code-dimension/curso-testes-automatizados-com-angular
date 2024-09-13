import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { TestHelper } from '@testing/helpers/test-helper';
import { MockProviders } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginFacadeService } from 'src/app/shared/services/login-facade/login-facade.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let testHelper: TestHelper<LoginComponent>;
  let router: Router;
  let loginFacadeService: LoginFacadeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProviders(Router, LoginFacadeService)],
      imports: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    testHelper = new TestHelper(fixture);

    router = TestBed.inject(Router);
    loginFacadeService = TestBed.inject(LoginFacadeService);

    fixture.detectChanges();
  });

  it('os campos devem iniciar vázios', () => {
    expect(testHelper.getInputValue('login-email')).toBe('');
    expect(testHelper.getInputValue('login-password')).toBe('');
  });

  describe('não deve chamar a ação de autenticação quando', () => {
    it('o formulário estiver inválido', () => {
      testHelper.submitForm('login-form');

      expect(loginFacadeService.login).not.toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });

    it('email estiver inválido', () => {
      const fakeEmail = 'invalido';
      const fakePassword = '123456';
  
      testHelper.triggerInputEvent('login-email', fakeEmail);
      testHelper.triggerInputEvent('login-password', fakePassword);

      testHelper.submitForm('login-form');

      expect(loginFacadeService.login).not.toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });
  });

  it('deve fazer a autenticação do usuário', () => {
    const fakeEmail = 'correto@dominio.com';
    const fakePassword = '123456';

    testHelper.triggerInputEvent('login-email', fakeEmail);
    testHelper.triggerInputEvent('login-password', fakePassword);

    (loginFacadeService.login as jest.Mock).mockReturnValue(
      of({ token: 'fake-jwt-token' })
    );

    testHelper.submitForm('login-form');

    expect(loginFacadeService.login).toHaveBeenCalledWith(
      fakeEmail,
      fakePassword
    );

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('deve mostrar uma mensagem de erro quando a autenticação falhar', () => {
    const fakeEmail = 'errado@dominio.com';
    const fakePassword = '123';

    expect(testHelper.queryByTestId('login-auth-failed')).toBeNull();

    testHelper.triggerInputEvent('login-email', fakeEmail);
    testHelper.triggerInputEvent('login-password', fakePassword);

    (loginFacadeService.login as jest.Mock).mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 401 }))
    );

    testHelper.submitForm('login-form');

    expect(loginFacadeService.login).toHaveBeenCalledWith(
      fakeEmail,
      fakePassword
    );

    expect(router.navigateByUrl).not.toHaveBeenCalled();

    fixture.detectChanges();

    expect(testHelper.queryByTestId('login-auth-failed')).toBeTruthy();
  });
});
