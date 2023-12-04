import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: 'init' | 'loading' = 'init';
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      this.emailSent = true;
      console.log(email);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
