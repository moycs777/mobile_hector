import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the InfiniteScrollDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[infinite-scroll]',
  host: {
    '(scroll)':'onScroll($event)'
  } // Attribute selector
})
export class InfiniteScrollDirective {
public element:any
@Output() OnScrollMethod = new EventEmitter();

  constructor(private el:ElementRef) {
    this.element = this.el.nativeElement;
    console.log('Hello InfiniteScrollDirective Directive');
  }

  onScroll($event){
    if (this.element.scrollTop + this.element.clientHeight >=this.element.scrollHeight) {
      this.OnScrollMethod.emit()
    }
  }

}
