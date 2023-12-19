import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { BoardsService } from '@services/boards.service';
import { CardsService } from '@services/cards.service';
import { CardModalComponent } from '@boards/components/card-modal/card-modal.component';
import { Column } from '@models/todo.model';
import { Board, List } from '@models/board.model';
import { Card, UpdateCardDTO } from '@models/card.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board: Board | null = null;
  inputCardTitle = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  faClose = faClose;

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
          const id = params.get('id') || '0';
          return this.boardsService.getOne({ id: parseInt(id) });
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

  openCardForm(selectedList: List) {
    if (this.board?.lists) {
      this.board.lists = this.board.lists.map(list => ({
        ...list,
        showCardForm: list.id === selectedList.id,
      }));
    }
  }

  createCard(list: List) {
    if (this.board) {
      const title = this.inputCardTitle.value;
      this.cardsService.create({
        title,
        position: this.boardsService.getPositionNewCard({ cards: list.cards }),
        listId: list.id,
        boardId: this.board?.id,
      })
        .subscribe({
          next: card => {
            list.cards.push(card);
            this.inputCardTitle.setValue('');
          },
          error: error => console.log(error),
        });
    }
  }

  closeCardForm(selectedList: List) {
    selectedList.showCardForm = false;
  }

}
