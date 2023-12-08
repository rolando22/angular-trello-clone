import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { CustomValidators } from '@utils/validators';
import { RequestStatus } from '@models/request-status.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [CustomValidators.MatchValidator({ source: 'password', target: 'confirmPassword' })]
  });
  formValidateUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  statusValidateUser: RequestStatus = 'init';
  errorMessage = '';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.registerAndLogin({ name, email, password })
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/app/boards']);
          },
          error: (error) => {
            this.status = 'failed';
            this.errorMessage = error.message;
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser() {
    if (this.formValidateUser.valid) {
      this.statusValidateUser = 'loading';
      const { email } = this.formValidateUser.getRawValue();
      this.authService.isAvailable({ email })
        .subscribe({
          next: (res) => {
            this.statusValidateUser = 'success';
            if (res.isAvailable) {
              this.showRegister = true;
              this.form.get('email')?.disable();
              this.form.controls.email.setValue(email);
            } else {
              this.router.navigate(['/login'], {
                queryParams: { email },
              });
            }
          },
          error: (error) => {
            this.statusValidateUser = 'failed';
            this.errorMessage = error.message;
          },
        });
    }
  }

}
