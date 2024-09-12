import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TokenResponse } from '../../interfaces/token.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string): Observable<TokenResponse> {
    if (email === 'correto@dominio.com' && password === '123456') {
      return of({ token: 'fake-jwt-token' });
    } else {
      return throwError(() => new HttpErrorResponse({ status: 401 }));
    }
  }
}
