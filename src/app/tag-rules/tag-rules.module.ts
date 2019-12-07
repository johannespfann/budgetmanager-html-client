import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RulesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RulesComponent
  ]
})
export class TagRulesModule { }
