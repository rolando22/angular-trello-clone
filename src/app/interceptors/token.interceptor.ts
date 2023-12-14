import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.context.get(CHECK_TOKEN)) return next.handle(request);
    const isValidToken = this.tokenService.isValidToken();
    if (isValidToken)
      return this.addToken(request, next);
    else
      return this.updateAccessTokenAndRefreshToken(request, next);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.tokenService.getToken();
    if (!token) return next.handle(request);
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(authRequest);
  }

  private updateAccessTokenAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const isValidRefreshToken = this.tokenService.isValidRefreshToken();
    if (!isValidRefreshToken) return next.handle(request);
    return this.authService.refreshToken()
      .pipe(
        switchMap(() => this.addToken(request, next)),
      );
  }
}
