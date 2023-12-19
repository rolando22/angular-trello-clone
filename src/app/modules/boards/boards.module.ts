import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsRoutingModule } from './boards-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from '@angular/cdk/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardModalComponent } from './components/card-modal/card-modal.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';

@NgModule({
  declarations: [
    CardModalComponent,
    BoardsComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CdkAccordionModule,
    DragDropModule,
    DialogModule,
    FontAwesomeModule,
  ]
})
export class BoardsModule { }
