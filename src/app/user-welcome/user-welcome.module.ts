import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountMenueComponent } from './account-menue.component';
import { AccountHelpComponent } from './account-help.component';

@NgModule({
  declarations: [
    AccountMenueComponent,
    AccountHelpComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountMenueComponent
  ]
})
export class UserWelcomeModule { }
