import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DoctorsPage } from '../doctors/doctors';
import { DatingPage } from '../dating/dating';
import { PatientProfilePage } from '../patient-profile/patient-profile';
import { DoctorProfilePage } from '../doctor-profile/doctor-profile';
import { AllPatientsPage } from '../all-patients/all-patients';
import { RecipesPage } from '../recipes/recipes';

import { SERVER_URL } from '../../providers/constants/constants';

@IonicPage()
@Component({
  selector: 'page-specialties',
  templateUrl: 'specialties.html',
})
export class SpecialtiesPage {
  url: string = "";
  email: string = "";
  mcenter_id: string = "";
  headers = new HttpHeaders();
  userinfo: Observable<any>;
  specialties: Observable<any>;
  allSpecialties: any = ['cardiologia', 'estomatologia', 'neurologia', 'pediatria'];

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient) {

    this.email = localStorage.getItem('email');
    this.menu.enable(true);
    this.url = SERVER_URL;


    this.userinfo = this.http.get(`${this.url}/user-information/${this.email}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    this.userinfo
    .subscribe(data => {
      console.log(data);
      this.mcenter_id = data.User.idCentro_medico;
    });

    this.specialties = this.http.get(`${this.url}/especialidades/${this.mcenter_id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    this.specialties
    .subscribe(data => {
      console.log(data);
      //this.allSpecialties = data;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecialtiesPage');
  }

  selectOne(value){
    this.navCtrl.push(DoctorsPage, {'specialitie':value, 'mcenter_id':this.mcenter_id});
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

  recipes(){
    this.navCtrl.push(RecipesPage);
  }

}
