import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SignaturePad} from "angular2-signaturepad/signature-pad";

@Component({
  selector: 'firm',
  templateUrl: 'firm.html'
})
export class FirmComponent implements AfterViewInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage: string;

  constructor() {
  }

  //Other Functions

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    console.log(this.signatureImage);
  }

  drawClear() {
    this.signaturePad.clear();
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

}
