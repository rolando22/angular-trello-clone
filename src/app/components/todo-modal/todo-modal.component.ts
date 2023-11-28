import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons';

import { InputData, OutputData } from 'src/app/models/todoModal.model';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html'
})
export class TodoModalComponent {

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  inputData: InputData;

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
