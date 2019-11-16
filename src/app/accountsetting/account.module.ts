import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import { AccountItemComponent } from './account-item.component';
import { AddAccountComponent } from './add-account.component';
import { ListAccountComponent } from './list-account.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountItemComponent,
    AddAccountComponent,
    ListAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
