import { Injectable } from '@angular/core';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

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
}
