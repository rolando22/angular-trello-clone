import { Component } from '@angular/core';
import { faBell, faInfoCircle, faClose, faAngleDown } from '@fortawesome/free-solid-svg-icons';

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

}
