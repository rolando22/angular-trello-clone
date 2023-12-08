import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) { }

  login({ email, password }: { email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/login`, { email, password });
  }

  register({ name, email, password }: { name: string, email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, { name, email, password })
      .pipe(
        catchError((error) => {
          if (error?.error?.code === 'SQLITE_CONSTRAINT_UNIQUE') throw new Error('This user already exists')
          throw new Error('Server Error')
        }),
      );
  }

  isAvailable({ email }: { email: string }) {
    return this.http.post<{ isAvailable: boolean }>(`${this.apiUrl}/api/v1/auth/is-available`, { email });
  }

  registerAndLogin({ name, email, password }: { name: string, email: string, password: string }) {
    return this.register({ name, email, password })
      .pipe(
        switchMap(() => this.login({ email, password })),
      );
  }

  recovery({ email }: { email: string }) {
    return this.http.post<{ link: string, recoveryToken: string }>(`${this.apiUrl}/api/v1/auth/recovery`, { email });
  }

  changePassword({ token, password }: { token: string, password: string }) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, { token, newPassword: password });
  }

}
