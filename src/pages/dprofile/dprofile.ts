import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.url =  SERVER_URL;
    let au = this.navParams.get('doctor_id');

    this.doctorInfo = this.http.get(`${this.url}/medicos/${au}`, {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad DprofilePage');
  }

}
