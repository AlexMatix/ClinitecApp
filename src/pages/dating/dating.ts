import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_URL } from '../../providers/constants/constants';

@IonicPage()
@Component({
  selector: 'page-dating',
  templateUrl: 'dating.html',
})
export class DatingPage {
  url:string = "";
  allDates: Observable<any>;
  confirmDate: Observable<any>;
  dates:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, private alertCtrl: AlertController) {
    this.url = SERVER_URL;

    this.allDates = this.http.get(`${this.url}/citas?centro=${localStorage.getItem('mcenter_id')}&medico=${localStorage.getItem('id')}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    this.allDates
    .subscribe(data => {
      this.dates = data;
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatingPage');
  }

  success(patient_id,date,hour){
    let data = {
      "Paciente": patient_id,
      "Medico":localStorage.getItem('id'),
      "Fecha":date,
      "Hora_inicio":hour
    };
    this.confirmDate = this.http.post(`${this.url}/confirmar-cita`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer  ${localStorage.getItem('access_token')}`
      }
    });
    this.confirmDate
    .subscribe(data => {
      let alert = this.alertCtrl.create({
        title: '¡Bien hecho! :)',
        subTitle: 'Cita hecha con éxito',
        buttons: ['Ok']
      });
      alert.present();
      console.log(data);
    }, err=>{
      let alert = this.alertCtrl.create({
        title: '¡Error! :(',
        subTitle: 'Revisa la información que has introducido',
        buttons: ['Ok']
      });
      alert.present();
      console.log(err);
    });

  }

}
