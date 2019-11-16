import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HistoryEntryComponent } from './history-entry.component';
import { ListEntryComponent } from './list-entry-component';
import { EditEntryComponent } from './edit-entry.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HistoryEntryComponent,
    ListEntryComponent,
    EditEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    HistoryEntryComponent
  ]
})
export class HistoryModule {}
