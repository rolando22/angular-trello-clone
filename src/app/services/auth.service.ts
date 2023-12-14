import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { TokenService } from '@services/token.service';
import { LoginResponse } from '@models/auth.model';
import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  login({ email, password }: { email: string, password: string }) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/v1/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          this.tokenService.saveToken({ token: res.access_token });
          this.tokenService.saveRefreshToken({ token: res.refresh_token });
        }),
      );
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

  logout() {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`, { context: checkToken() })
      .pipe(
        tap(user => this.user$.next(user)),
      );
  }

  refreshToken() {
    const refreshToken = this.tokenService.getRefreshToken();
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/v1/auth/refresh-token`, { refreshToken })
    .pipe(
      tap((res) => {
        this.tokenService.saveToken({ token: res.access_token });
        this.tokenService.saveRefreshToken({ token: res.refresh_token });
      }),
    );
  }

}
