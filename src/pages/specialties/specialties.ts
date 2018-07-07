import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { DoctorsPage } from '../doctors/doctors';
import { DatingPage } from '../dating/dating';
import { PatientProfilePage } from '../patient-profile/patient-profile';
import { DoctorProfilePage } from '../doctor-profile/doctor-profile';
import { AllPatientsPage } from '../all-patients/all-patients';

@IonicPage()
@Component({
  selector: 'page-specialties',
  templateUrl: 'specialties.html',
})
export class SpecialtiesPage {

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecialtiesPage');
  }

  selectOne(){
    this.navCtrl.push(DoctorsPage);
  }

  dating(){
    this.navCtrl.push(DatingPage);
  }

  patient_profile(){
    this.navCtrl.push(PatientProfilePage);
  }

  doctor_profile(){
    this.navCtrl.push(DoctorProfilePage);
  }

  allPatients(){
    this.navCtrl.push(AllPatientsPage);
  }

}
