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

    this.http.get(`${this.url}/obtener-info-medico/${localStorage.getItem('id')}`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .subscribe(data =>{
      this.doctorProfile = data;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorProfilePage');
  }

  updateData(){
    this.doctorProfile.Medico = localStorage.getItem('id');

    this.res = this.http.post(`${this.url}/guardar-info-medico`,this.doctorProfile, {
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
