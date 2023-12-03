import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: 'init' | 'loading' = 'init';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  login() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      console.log(email, password);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
