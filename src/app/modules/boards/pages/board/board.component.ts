import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';

import { TodoModalComponent } from '@boards/components/todo-modal/todo-modal.component';
import { ToDo, Column } from 'src/app/models/todo.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  columns: Column[] = [
    {
      title: 'To Do',
      todos: [
        {
          id: '1',
          title: 'Task 1',
        },
        {
          id: '2',
          title: 'Task 2',
        },
        {
          id: '3',
          title: 'Task 3',
        },
      ],
    },
    {
      title: 'Doing',
      todos: [
        {
          id: '4',
          title: 'Task 4',
        },
        {
          id: '5',
          title: 'Task 5',
        },
        {
          id: '6',
          title: 'Task 6',
        },
      ],
    },
    {
      title: 'Done',
      todos: [
        {
          id: '7',
          title: 'Task 7',
        },
        {
          id: '8',
          title: 'Task 8',
        },
        {
          id: '9',
          title: 'Task 9',
        },
      ],
    },
  ];

  constructor(
    private dialog: Dialog
  ) {}

  dropTodo(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }

  dropColumn(event: CdkDragDrop<Column[]>) {
    console.log(event);
    if (event.previousContainer === event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }

  addColumn() {
    this.columns.push({ title: 'New Column', todos: [] });
  }

  openTodoModal(column: string, todo: ToDo) {
    const dialogRef = this.dialog.open(TodoModalComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        column,
        todo,
      },
      disableClose: true,
    });
    dialogRef.closed.subscribe(output => console.log(output));
  }

}
