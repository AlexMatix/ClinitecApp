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
  doctorInfo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    let au = localStorage.getItem('mcenter_id');
    let er = this.navParams.get('specialitie');
    this.url = SERVER_URL;

    console.log(er);
    
    this.http.get(`${this.url}/especialidades/${au}?Especialidad=${er}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .subscribe(data => {
      console.log(data);
      this.doctorInfo = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorsPage');
  }

  viewProfile(doctorId){
    this.navCtrl.push(DprofilePage,{"doctor_id":doctorId});
  }

}