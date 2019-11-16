import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingOrderInfoComponent } from './standingorderinfocomponent/standing-order-info.component';
import { FormsModule } from '@angular/forms';
import { EntryInfoComponent } from './entryinfocomponent/entry-info.component';
import { TagsComponent } from './tags';

@NgModule({
  declarations: [
    StandingOrderInfoComponent,
    EntryInfoComponent,
    TagsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    StandingOrderInfoComponent,
    EntryInfoComponent,
    TagsComponent
  ]
})
export class SharedModule { }
