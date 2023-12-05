import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsRoutingModule } from './boards-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TodoModalComponent } from './components/todo-modal/todo-modal.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';

@NgModule({
  declarations: [
    TodoModalComponent,
    BoardsComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    SharedModule,
    CdkAccordionModule,
    DragDropModule,
    FontAwesomeModule,
  ]
})
export class BoardsModule { }
