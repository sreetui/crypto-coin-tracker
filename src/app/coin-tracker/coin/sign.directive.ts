import { AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Column } from '../state/model/coin.interfaces';

@Directive({
  selector: '[cryptoCoinTrackerSign]',
  standalone: true,
})
export class SignDirective implements AfterViewInit {
  @Input("cryptoCoinTrackerSign")
  fieldName!: string;
  readonly FIELD_NAMES = ["percentChange1hr", "percentChange24hr", "percentChange7d"];
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
  ngAfterViewInit(): void {
    const text = <string>this.el.nativeElement.innerText;
    if (this.FIELD_NAMES.includes(this.fieldName)) {
      const color = text.startsWith("-") ? "red" : "green";
      this.renderer.setStyle(this.el.nativeElement, "color", color);
    }
  }

}
