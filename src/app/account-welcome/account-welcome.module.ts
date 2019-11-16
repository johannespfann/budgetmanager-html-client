import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountWelcomeComponent } from './account-welcome.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountWelcomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AccountWelcomeComponent
  ]
})
export class AccountWelcomeModule { }
