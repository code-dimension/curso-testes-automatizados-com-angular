import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonXsDirective } from 'src/app/shared/directives/button/button.directive';
import { Router } from '@angular/router';
import { LoginFacadeService } from 'src/app/shared/services/login-facade/login-facade.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonXsDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  
  router = inject(Router);
  loginFacadeService = inject(LoginFacadeService);
  
  showAuthFailedMessage = signal(false);

  form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
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

    this.loginFacadeService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.showAuthFailedMessage.set(true);
        }
      })

  }
}
