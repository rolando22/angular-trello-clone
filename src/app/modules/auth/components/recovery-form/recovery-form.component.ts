import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { CustomValidators } from '@utils/validators';
import { RequestStatus } from '@models/request-status.model';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html'
})
export class RecoveryFormComponent {

  form = this.formBuilder.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [CustomValidators.MatchValidator({ source: 'password', target: 'confirmPassword' })],
  });
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  token = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParamMap
      .subscribe(params => {
        const token = params.get('token');
        if (!token) return this.router.navigate(['/login']);
        return this.token = token;
      });
  }

  recovery() {
    if (this.form.valid) {
      this.status = 'loading';
      const { password } = this.form.getRawValue();
      this.authService.changePassword({ token: this.token, password })
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/login']);
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
