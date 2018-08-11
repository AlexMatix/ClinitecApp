import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DprofilePage } from '../dprofile/dprofile';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../providers/constants/constants';

@IonicPage()
@Component({
  selector: 'page-doctors',
  templateUrl: 'doctors.html',
})
export class DoctorsPage {
  
  url:string = ""
  doctorInfo = [{
    "doctor_id":"13",
    "photo_url":"assets/imgs/garcia.jpg",
    "job_position": "Cardiología",
    "name":"Dra. García",
    "about_me":"Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo...."
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    let au = localStorage.getItem('mcenter_id');
    let er = this.navParams.get('specialitie');
    this.url = SERVER_URL;
    
    this.http.get(`${this.url}/especialidades/${au}?Especialidad=${er}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .subscribe(data => {
      //this.doctorInfo = data;
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorsPage');
  }

  viewProfile(doctor_id){
    this.navCtrl.push(DprofilePage,{"doctor_id":doctor_id});
  }

}