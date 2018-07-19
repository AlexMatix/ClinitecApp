import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_URL } from '../../providers/constants/constants';

@IonicPage()
@Component({
  selector: 'page-doctor-profile',
  templateUrl: 'doctor-profile.html',
})
export class DoctorProfilePage {
  url:any = "";
  res:Observable<any>;
  doctorProfile: any = {

  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.url = SERVER_URL;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorProfilePage');
  }

  updateData(){
    let data = {
       "Medico":localStorage.getItem('id'),
       "photo_url": "assets/imgs/upload.png",
       "job_position":"Cardiologa",
       "name": "Dr. García",
       "address":"Huamantla, Tlax",
       "phone":"222323342",
       "about_me":"demo text",
       "services_prices":"demo text",
       "attention_hour":"Lunes - Viernes de 9:00 am - 18:00 pm"
    };

    this.res = this.http.post(`${this.url}/guardar-info-medico`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer  ${localStorage.getItem('access_token')}`
      }
    });

    this.res
    .subscribe(data => {
      console.log(data);
    }) 
  }

}
