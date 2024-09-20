import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addAuthorizationHeaderInterceptor } from './core/interceptors/add-authorization-header/add-authorization-header.interceptor';
import { setAsLoggedInIfStorageTokenExistsInitializerProvider } from './core/initializers/set-as-logged-in-if-storage-token-exists/set-as-logged-in-if-storage-token-exists.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([addAuthorizationHeaderInterceptor])
    ),
    setAsLoggedInIfStorageTokenExistsInitializerProvider
  ],
};
