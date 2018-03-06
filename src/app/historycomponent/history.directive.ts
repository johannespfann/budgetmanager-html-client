import { Directive, ViewContainerRef, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[history-action-placeholder]',
})
export class HistoryDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}