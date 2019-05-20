import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_URL } from '../../providers/constants/constants';

@IonicPage()
@Component({
  selector: 'page-dprofile',
  templateUrl: 'dprofile.html',
})
export class DprofilePage {
  url:string = "";
  doctorInfo: Observable<any>;
  doctorProfile: any;
  date:any;
  start_hour:any;
  end_hour:any;
  doctorId:any;
  aDate:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
              public alertCtrl: AlertController) {
    this.url =  SERVER_URL;
    this.doctorId = this.navParams.get('doctor_id');

    this.doctorInfo = this.http.get(`${this.url}/obtener-info-medico/${this.doctorId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    this.doctorInfo
    .subscribe(data => {
      console.log(data);
      this.doctorProfile = data;
    });
  }

  schedule(){
     let data = {
      "Titulo" : "Cita médica",
      "Fecha" : this.date,
      "Hora_inicio" : this.start_hour,
      "Hora_termino" : this.end_hour,
      "idPaciente" : localStorage.getItem('id'),
      "idMedico" : this.doctorId,
      "idCentro_medico" : localStorage.getItem('mcenter_id')
    }

    this.aDate = this.http.post(`${this.url}/citas`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer  ${localStorage.getItem('access_token')}`
      }
    });

    this.aDate
    .subscribe(data => {
      console.log(data);
      let alert = this.alertCtrl.create({
        title: 'Petición de cita enviada',
        buttons: ['Dismiss']
      });
      alert.present();
    }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DprofilePage');
  }

}
