import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AlertMessageService } from '../../services/alert-message.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  authService = inject(AuthService);
  alertMessageService = inject(AlertMessageService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success === true) {
            this.alertMessageService.showToast('Login Successful!', 'success');
            this.authService.saveToken(res.data.token);
            this.router.navigate(['/admin']);
          }
        },
        error: (err) => {
          this.alertMessageService.showToast(err.error.message, 'error');
          console.error('Login failed', err.error.message)
        }
      });
    }
  }

  redirectTo(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
