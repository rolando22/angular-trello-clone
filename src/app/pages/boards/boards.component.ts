import { Component } from '@angular/core';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent {

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;

  accordionWorkspace = [
    {
      label: 'Boards',
      icon: faTrello,
    },
    {
      label: 'Highlights',
      icon: faHeart,
    },
    {
      label: 'Views',
      icon: faBorderAll,
    },
    {
      label: 'Members',
      icon: faUsers,
    },
    {
      label: 'Setting',
      icon: faGear,
    },
  ];

}
