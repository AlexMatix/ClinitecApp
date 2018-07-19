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
  doctorProfile: any = {
    "photo_url": "assets/imgs/garcia.jpg",
    "job_position":"Cardiologa",
    "name": "Dr. García",
    "address":"Huamantla, Tlax",
    "phone":"222323342",
    "about_me":`Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, 
                eget blandit nunc tortor eu nibh. Lorem ipsum dolor sit amet, consectetuer 
                adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna.
                In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Nullam mollis. 
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, 
                aliquet vel, dapi.`,
    "education":`Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, 
                 aliquet vel, dapibus id, mattis vel, nisi. Nullam mollis. 
                 Phasellus hendrerit. Pellentesque aliquet nibh nec urna. 
                 In nisi neque, aliquet vel, dapi.`,
    "services_prices":`Zril causae ancillae sit ea. Dicam veritus mediocritatem sea ex, 
                       nec id agam eius. Te pri facete latine salutandi, scripta 
                       mediocrem et sed, cum ne mundi vulputate. Ne his sint graeco 
                       detraxit, posse exerci volutpat has in.`,
    "attention_hour":"Lunes - Viernes de 9:00 am - 18:00 pm"
  };
  date:any;
  hour:any;
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
      //this.doctorProfile = data;
      console.log(data);
    });
  }

  schedule(){
     let data = {
      "Titulo" : "Cita médica",
      "Fecha" : this.date,
      "Hora_inicio" : this.hour,
      "Hora_termino" : ":)",
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
