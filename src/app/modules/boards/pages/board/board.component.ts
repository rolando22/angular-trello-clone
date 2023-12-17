import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';

import { BoardsService } from '@services/boards.service';
import { CardsService } from '@services/cards.service';
import { CardModalComponent } from '@boards/components/card-modal/card-modal.component';
import { Column } from '@models/todo.model';
import { Board } from '@models/board.model';
import { Card, UpdateCardDTO } from '@models/card.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board: Board | null = null;

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private cardsService: CardsService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id') || '';
          return this.boardsService.getOne({ id });
        })
      )
      .subscribe({
        next: board => this.board = board,
        error: error => console.log(error),
      });
  }

  dropTodo(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    const position = this.boardsService.getPosition({ cards: event.container.data, currentIndex: event.currentIndex });
    const cardId = event.container.data[event.currentIndex].id;
    const listId = parseInt(event.container.id);
    this.updateCard(cardId, { position , listId });
  }

  dropColumn(event: CdkDragDrop<Column[]>) {
    console.log(event);
    if (event.previousContainer === event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }

  addColumn() {
    // this.columns.push({ title: 'New Column', todos: [] });
  }

  private updateCard(id: Card['id'], changes: UpdateCardDTO) {
    this.cardsService.update({ id, changes })
      .subscribe({
        next: cardUpdated => console.log(cardUpdated),
        error: error => console.log(error),
      });
  }

  openTodoModal(column: string, card: Card) {
    const dialogRef = this.dialog.open(CardModalComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        column,
        card,
      },
      disableClose: true,
    });
    dialogRef.closed.subscribe(output => console.log(output));
  }

}
