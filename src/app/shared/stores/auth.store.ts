import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  #state = false;

  isLoggedIn() {
    return this.#state;
  };

  setAsLoggedIn() {
    this.#state = true;
  };

}
