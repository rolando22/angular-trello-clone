import { Injectable } from '@angular/core';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'token_trello';
  private refreshTokenKey = 'refresh_token_trello';

  constructor() { }

  saveToken({ token }: { token: string }) {
    setCookie(this.tokenKey, token, { expires: 365, path: '/' });
  }

  getToken() {
    return getCookie(this.tokenKey);
  }

  removeToken() {
    removeCookie(this.tokenKey);
  }

  saveRefreshToken({ token }: { token: string }) {
    setCookie(this.refreshTokenKey, token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    return getCookie(this.refreshTokenKey);
  }

  removeRefreshToken() {
    removeCookie(this.refreshTokenKey);
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) return false;
    const decodeToken = jwtDecode(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) return false;
    const decodeToken = jwtDecode(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
