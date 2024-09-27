import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { TestHelper } from '@testing/helpers/test-helper';
import { MockProvider } from 'ng-mocks';
import { AuthStoreService } from 'src/app/shared/stores/auth.store';
import { of } from 'rxjs';
import { LogoutFacadeService } from 'src/app/shared/services/logout-facade/logout-facade.service';

async function setupTest({ isLoggedIn }: { isLoggedIn: boolean }) {
  await TestBed.configureTestingModule({
    imports: [LogoutComponent],
    providers: [
      MockProvider(AuthStoreService),
      MockProvider(LogoutFacadeService),
    ],
  }).compileComponents();

  const authStoreService = TestBed.inject(AuthStoreService);
  const logoutFacadeService = TestBed.inject(LogoutFacadeService);

  (authStoreService.isLoggedIn$ as jest.Mock).mockReturnValue(of(isLoggedIn));

  const fixture = TestBed.createComponent(LogoutComponent);
  const testHelper = new TestHelper(fixture);

  fixture.detectChanges();

  return {
    fixture,
    testHelper,
    authStoreService,
    logoutFacadeService,
  };
}

describe('LogoutComponent', () => {

  describe('quando usuário não estiver logado', () => {
    it('não deve renderizar um botão de sair', async () => {
      const { testHelper } = await setupTest({ isLoggedIn: false });

      expect(testHelper.queryByTestId('header-logout')).toBeNull();
    });
  });

  describe('quando usuário estiver logado', () => {
    it('deve fazer logout', async () => {
      const { testHelper, logoutFacadeService } = await setupTest({ isLoggedIn: true });

      expect(testHelper.queryByTestId('header-logout')).toBeTruthy();

      testHelper.click('header-logout');

      expect(logoutFacadeService.logout).toHaveBeenCalled();
    });
  });
});
