import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { BoardsService } from '@services/boards.service';
import { CardsService } from '@services/cards.service';
import { ListsService } from '@services/lists.service';
import { CardModalComponent } from '@boards/components/card-modal/card-modal.component';
import { Column } from '@models/todo.model';
import { Board } from '@models/board.model';
import { List } from '@models/list.model';
import { Card, UpdateCardDTO } from '@models/card.model';
import { colorsBackground, mapColorsBackground } from '@models/color.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  board: Board | null = null;
  inputCardTitle = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  inputListTitle = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  showListForm = false;
  faClose = faClose;
  mapsColor: mapColorsBackground = colorsBackground;

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private cardsService: CardsService,
    private listsService: ListsService,
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
        next: board => {
          this.board = board;
          this.boardsService.setBackgroundColor({ color: this.board.backgroundColor });
        },
        error: error => console.log(error),
      });
  }

  ngOnDestroy(): void {
    this.boardsService.setBackgroundColor({ color: 'sky' });
  }

  get colors() {
    const backgroundColor = this.board?.backgroundColor || 'sky';
    return this.mapsColor[backgroundColor];
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

  addList() {
    if (this.board) {
      const title = this.inputListTitle.value;
      this.listsService.create({
        title,
        position: this.boardsService.getPositionNewItem({ elements: this.board.lists }),
        boardId: this.board.id,
      })
        .subscribe({
          next: list => {
            this.board?.lists.push({
              ...list,
              cards: [],
            });
            this.showListForm = false;
            this.inputListTitle.setValue('');
          },
          error: error => console.log(error),
        });
    }
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
        position: this.boardsService.getPositionNewItem({ elements: list.cards }),
        listId: list.id,
        boardId: this.board.id,
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
