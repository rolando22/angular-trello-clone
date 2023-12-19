import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faInfoCircle, faClose, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { color, mapColorsBackground, navColorsBackground } from '@models/color.model';

import { AuthService } from '@services/auth.service';
import { BoardsService } from '@services/boards.service';

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

  navColor: color = 'sky';
  mapColors: mapColorsBackground = navColorsBackground;

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
    private boardsService: BoardsService,
  ) {
    this.boardsService.backgroundColor$
      .subscribe(color => this.navColor = color);
  }

  get colors() {
    return this.mapColors[this.navColor];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  closeOverlay(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }

}
