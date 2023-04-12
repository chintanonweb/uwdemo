import { Directive, HostListener, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer2, SimpleChanges, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';


@Directive({
  selector: '[customDisableSubmitButtinDirective]'
})
export class DisableSubmitButtinDirectiveDirective implements OnInit, OnChanges, OnDestroy {

  @Input('appDisableAfterClick') reenableButton: EventEmitter<boolean>;
  subscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  @HostListener('click')
  onClick() {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
  }

  ngOnInit() {
    this.subscription = this.reenableButton.subscribe(value => {
      //debugger;
      //console.log('Got the value as ', value);
      if (!value) this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reenableButton = changes.reenableButton.currentValue;

    this.reenableButton.subscribe(_ => {
      (<HTMLButtonElement>this.el.nativeElement).disabled = false;
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  /*  constructor(private elementRef: ElementRef) { 
      if(!this.disableButton)
          this.elementRef.nativeElement.removeAttribute('disabled');
    }
  @Input() disableTime = 500;
  @Input() disableButton;
    @HostListener('click', ['$event'])
    clickEvent() {
        this.elementRef.nativeElement.setAttribute('disabled', 'true');
        //alert("***************");
        //setTimeout(() => this.elementRef.nativeElement.removeAttribute('disabled'), this.disableTime);
        if(!this.disableButton)
          this.elementRef.nativeElement.removeAttribute('disabled');
    }*/

}
