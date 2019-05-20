import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_URL } from '../../providers/constants/constants';

@IonicPage()
@Component({
  selector: 'page-all-patients',
  templateUrl: 'all-patients.html',
})
export class AllPatientsPage {
  allPatients:any;
  patients: Observable<any>;
  recipe: Observable<any>;
  url:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
              public alertCtrl: AlertController) {
    this.url =  SERVER_URL;

    this.patients = this.http.get(`${this.url}/pacientes-medicos/${localStorage.getItem('id')}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    this.patients
    .subscribe(data => {
      this.allPatients = data;
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllPatientsPage');
  }

  resend(patient){
    let data = {
      "Medico":localStorage.getItem('id'),
      "Paciente":patient
    };
    
    this.recipe = this.http.post(`${this.url}/ultima-receta`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer  ${localStorage.getItem('access_token')}`
      }
    });

    this.recipe
    .subscribe(data => {
      console.log(data);
      let alert = this.alertCtrl.create({
        title: 'Receta reenviada',
        buttons: ['Ok']
      });
      alert.present();
    }) 
  }

}
