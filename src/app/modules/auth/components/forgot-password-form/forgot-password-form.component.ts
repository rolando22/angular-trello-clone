import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent implements OnDestroy {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  setInterval = 0;
  time = 5;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    window.clearInterval(this.setInterval);
  }

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      this.authService.recovery({ email })
      .subscribe({
        next: (res) => {
            this.status = 'success';
            this.setInterval = window.setInterval(() => {
              this.time--;
              if (this.time === 0) this.router.navigate(['/recovery'], {
                queryParams: { token: res.recoveryToken },
              });
            }, 1000);
          },
          error: (error) => {
            this.status = 'failed';
            console.log(error);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
