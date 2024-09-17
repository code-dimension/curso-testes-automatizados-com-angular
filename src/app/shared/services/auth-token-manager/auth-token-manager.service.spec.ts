import { TestBed } from '@angular/core/testing';

import { AuthTokenManagerService } from './auth-token-manager.service';
import { MockProvider } from 'ng-mocks';
import { LocalStorageToken } from '../../tokens/local-storage.token';

describe('AuthTokenManagerService', () => {
  let service: AuthTokenManagerService;
  let storage: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(LocalStorageToken, {
          setItem: jest.fn(),
          getItem: jest.fn(),
        }),
      ],
    });

    service = TestBed.inject(AuthTokenManagerService);
    storage = TestBed.inject(LocalStorageToken);
  });

  it('deve adicionar o token ao local storage', () => {
    const fakeToken = 'fake-token';

    service.setToken(fakeToken);

    expect(storage.setItem).toHaveBeenCalledWith('auth-token', fakeToken);
  });

  it('deve recuperar o token do local storage', () => {
    const fakeToken = 'fake-token';

    (storage.getItem as jest.Mock).mockReturnValue(fakeToken);

    const result = service.getToken();

    expect(storage.getItem).toHaveBeenCalledWith('auth-token');

    expect(result).toBe(fakeToken);
  });
});
