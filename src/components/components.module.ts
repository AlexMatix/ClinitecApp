import { NgModule } from '@angular/core';
import { FirmComponent } from './firm/firm';
import {IonicModule} from "ionic-angular";
import {SignaturePadModule} from "angular2-signaturepad";
@NgModule({
	declarations: [FirmComponent],
  imports: [
    IonicModule,
    SignaturePadModule
  ],
	exports: [FirmComponent]
})
export class ComponentsModule {}
