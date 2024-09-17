import { InjectionToken } from '@angular/core';

export const LocalStorageToken = new InjectionToken<Storage>(
  'LocalStorageToken',
  {
    factory() {
      return window.localStorage;
    },
  }
);
