import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirmPage } from './firm';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    FirmPage,
  ],
    imports: [
        IonicPageModule.forChild(FirmPage),
        ComponentsModule,
    ],
})
export class FirmPageModule {}
