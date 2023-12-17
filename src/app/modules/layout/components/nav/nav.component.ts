import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faInfoCircle, faClose, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;

  user$ = this.authService.user$;

  accountMenu = [
    {
      label: 'Profile',
      routerLink: '/app/profile',
    },
    {
      label: 'Activity',
      routerLink: '',
    },
    {
      label: 'Cards',
      routerLink: '',
    },
    {
      label: 'Settings',
      routerLink: '',
    },
  ];

  constructor (
    private router: Router,
    private authService: AuthService,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  closeOverlay(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }

}
