import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BalanceComponent } from './balance.component';

@NgModule({
  declarations: [
    BalanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    BalanceComponent
  ]
})
export class BalanceModule { }
