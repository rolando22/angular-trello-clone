import { Injectable } from '@angular/core';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'token_trello'

  constructor() { }

  save({ token }: { token:string }) {
    setCookie(this.tokenKey, token, { expires: 365, path: '/' });
  }

  get() {
    return getCookie(this.tokenKey);
  }

  remove() {
    removeCookie(this.tokenKey);
  }

  isValid() {
    const token = this.get();
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
