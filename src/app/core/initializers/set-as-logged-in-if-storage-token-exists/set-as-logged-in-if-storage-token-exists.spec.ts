import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoginFacadeService } from 'src/app/shared/services/login-facade/login-facade.service';
import { setAsLoggedInIfStorageTokenExistsInitializer, setAsLoggedInIfStorageTokenExistsInitializerProvider } from './set-as-logged-in-if-storage-token-exists.initializer';
import { MockProvider } from 'ng-mocks';

describe('setAsLoggedInIfStorageTokenExistsInitializer', () => {
  it('deve logar o usuário quando o token de autenticação existir', () => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(LoginFacadeService),
        setAsLoggedInIfStorageTokenExistsInitializerProvider,
      ],
    });

    const loginFacadeService = TestBed.inject(LoginFacadeService);

    expect(
      loginFacadeService.setAsLoggedInIfStorageTokenExists
    ).toHaveBeenCalled();
  });
});
