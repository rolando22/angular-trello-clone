import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons';

import { InputData, OutputData } from '@models/card-modal.model';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html'
})
export class CardModalComponent {

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;

  inputData: InputData;

  asideMenu = [
    {
      label: 'Members',
      icon: faUser,
    },
    {
      label: 'Labels',
      icon: faTag,
    },
    {
      label: 'Checklist',
      icon: faCheckSquare,
    },
    {
      label: 'Dates',
      icon: faClock,
    },
  ];

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData,
  ) {
    this.inputData = data;
  }

  close() {
    this.dialogRef.close({
      rta: true,
     });
  }

}
