import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class WindowService {
  window: (Window & typeof globalThis) | null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
 }

}
