import {Directive, ElementRef, inject, Input, OnChanges, OnDestroy} from '@angular/core';


@Directive({
  selector: '[reactComponent]',
  standalone: true
})
export class ReactComponentDirective implements OnChanges, OnDestroy {

  ngOnChanges() {
    // @ts-ignore
    this.root.render(createElement(this.reactComponent, this.props))
  }

  ngOnDestroy(): void {

  }
  constructor() { }

}
