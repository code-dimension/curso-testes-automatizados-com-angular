import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { TestHelper } from '@testing/helpers/test-helper';
import { MockProvider, MockProviders } from 'ng-mocks';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let testHelper: TestHelper<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProviders(AuthService, Router)],
      imports: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    testHelper = new TestHelper(fixture);

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('deve fazer a autenticação do usuário', () => {
    const fakeEmail = 'correto@dominio.com';
    const fakePassword = '123456';

    testHelper.triggerInputEvent('login-email', fakeEmail);
    testHelper.triggerInputEvent('login-password', fakePassword);
    
    (authService.login as jest.Mock).mockReturnValue(of({ token: 'fake-jwt-token' }));

    testHelper.submitForm('login-form');

    expect(authService.login).toHaveBeenCalledWith(fakeEmail, fakePassword);

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
