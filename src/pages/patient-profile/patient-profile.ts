import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-patient-profile',
  templateUrl: 'patient-profile.html',
})
export class PatientProfilePage {
  patientProfile:any = {
    "photo_url":"assets/imgs/upload.png",
    "name": localStorage.getItem('name'),
    "email":localStorage.getItem('email'),
    "lastName": localStorage.getItem('lastName'),
    "phone":localStorage.getItem('phone')
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientProfilePage');
  }

  updateData(){
    console.log("Información actualizada")
  }

}
