import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '@services/token.service';

export const RedirectGuard: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const isValidToken = inject(TokenService).isValid();
  const router = inject(Router);
  if (isValidToken) router.navigate(['/app/boards']);
  return true;
}
