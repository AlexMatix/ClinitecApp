import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DprofilePage } from '../dprofile/dprofile';

@IonicPage()
@Component({
  selector: 'page-doctors',
  templateUrl: 'doctors.html',
})
export class DoctorsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorsPage');
  }

  viewProfile(){
    this.navCtrl.push(DprofilePage)
  }

}
