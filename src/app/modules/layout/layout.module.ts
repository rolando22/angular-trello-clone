import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '@shared/shared.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    OverlayModule,
    FontAwesomeModule,
  ]
})
export class LayoutModule { }
