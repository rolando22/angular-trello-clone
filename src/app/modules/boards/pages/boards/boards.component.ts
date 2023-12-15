import { Component, OnInit } from '@angular/core';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import {
  faBox,
  faWaveSquare,
  faClock,
  faAngleUp,
  faAngleDown,
  faHeart,
  faBorderAll,
  faUsers,
  faGear
} from '@fortawesome/free-solid-svg-icons';

import { MeService } from '@services/me.service';
import { Board } from '@models/board.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit {

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

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

  boards: Board[] = [];

  constructor(
    private meService: MeService,
  ) {}

  ngOnInit(): void {
    this.meService.getMeBoards()
      .subscribe({
        next: (boards) => this.boards = boards,
        error: (error) => console.log(error),
      });
  }

}
