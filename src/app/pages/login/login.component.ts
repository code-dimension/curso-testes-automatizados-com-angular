import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonXsDirective } from 'src/app/shared/directives/button/button.directive';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthStoreService } from 'src/app/shared/stores/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonXsDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  
  authService = inject(AuthService);
  router = inject(Router);
  authStoreService = inject(AuthStoreService);
  
  showAuthFailedMessage = signal(false);

  form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if(this.form.invalid) {
      return;
    };

    const email = this.form.value.email as string;
    const password = this.form.value.password as string;

    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.authStoreService.setAsLoggedIn();
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.showAuthFailedMessage.set(true);
        }
      })

  }
}
