import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[component-action-placeholder]',
})
export class ComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}