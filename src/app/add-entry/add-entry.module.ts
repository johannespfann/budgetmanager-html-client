import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddEntryComponent } from './add-entry.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    AddEntryComponent
  ]
})
export class AddEntryModule { }
