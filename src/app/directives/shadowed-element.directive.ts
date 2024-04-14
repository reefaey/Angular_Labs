import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appShadowedElement]',
  standalone: true
})
export class ShadowedElementDirective implements OnChanges {

  //from view
  @Input('appShadowedElement') defaulMyColor: string = 'brown'; // for the value of directive attr itself
  @Input() BGColor: string = 'yellow'; // for the value of my custom attr 
  // constructor(private element:ElementRef) {
  //   this.element.nativeElement.style.boxShadow = '5px 10px #888888';
  //   this.element.nativeElement.style.backgroundColor = this.BGColor;
  //  }

  constructor(private element: ElementRef) {
  }

  ngOnChanges() {
    this.element.nativeElement.style.boxShadow = '5px 10px #888888';
    this.element.nativeElement.style.borderRadius = '20px';
    this.element.nativeElement.style.backgroundColor = this.BGColor;
  }

  @HostListener('mouseover') onMouseOver() {
    this.element.nativeElement.style.boxShadow = '10px 15px #888888';
    this.element.nativeElement.style.backgroundColor = 'white';

  }

  @HostListener('mouseout') onMouseOut() {
    this.element.nativeElement.style.boxShadow = '5px 10px #888888';
    this.element.nativeElement.style.backgroundColor = this.BGColor;
  }

  // private element;
  // constructor(elem:ElementRef) {
  //   this.element = elem;
  //   this.element.nativeElement.style.backgroundColor = 'pink';
  //  }

}
