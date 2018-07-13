import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-doctor-profile',
  templateUrl: 'doctor-profile.html',
})
export class DoctorProfilePage {  
  doctorProfile: any = {
    "photo_url": "assets/imgs/upload.png",
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorProfilePage');
  }

  updateData(){
    console.log("Información actualizada")
  }

}
