import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPatientsPage } from './all-patients';

@NgModule({
  declarations: [
    AllPatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPatientsPage),
  ],
})
export class AllPatientsPageModule {}
