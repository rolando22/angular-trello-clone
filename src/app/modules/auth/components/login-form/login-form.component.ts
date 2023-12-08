import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe(params => {
        const email = params.get('email');
        if (email) this.form.controls.email.setValue(email);
      });
  }

  login() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login({ email, password })
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/app']);
          },
          error: () => {
            this.status = 'failed';
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
