import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StandingOrderComponent } from './standingorder.component';
import { StandingOrderListComponent } from './standingorder-list.component';
import { EditStandingOrderComponent } from './edit-standingorder.component';

@NgModule({
  declarations: [
    StandingOrderComponent,
    StandingOrderListComponent,
    EditStandingOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    StandingOrderComponent
  ]
})
export class StandingOrderHistoryModule { }
