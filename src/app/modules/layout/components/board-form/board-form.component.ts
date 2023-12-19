import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { BoardsService } from '@services/boards.service';
import { color } from '@models/color.model';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {

  boardForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<color>('sky', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  faCheck = faCheck;
  @Output() closeOverlay = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
    private router: Router,
  ) {}

  createBoard() {
    if (this.boardForm.valid) {
      const { title, backgroundColor } = this.boardForm.getRawValue();
      this.boardsService.create({ title, backgroundColor })
        .subscribe({
          next: board => {
            this.close();
            this.router.navigate(['/app/boards', board.id])
          },
          error: error => console.log(error),
        });
    } else {
      this.boardForm.markAllAsTouched();
    }
  }

  close() {
    this.closeOverlay.next(false);
  }

}
