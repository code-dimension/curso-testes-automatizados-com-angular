import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStoreService } from 'src/app/shared/stores/auth.store';
import { LogoutFacadeService } from 'src/app/shared/services/logout-facade/logout-facade.service';
import { ButtonXsDirective } from 'src/app/shared/directives/button/button.directive';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, ButtonXsDirective],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {

  authStoreService = inject(AuthStoreService);
  logoutFacadeService = inject(LogoutFacadeService);

  isLoggedIn$ = this.authStoreService.isLoggedIn$();

  onLogout() { 
    this.logoutFacadeService.logout();
  }
}
