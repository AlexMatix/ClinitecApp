import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { SpecialtiesPage } from '../specialties/specialties';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';

import {SERVER_URL} from '../../providers/constants/constants';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  server_url: any;
  username: any = "";
  pass: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.server_url = SERVER_URL;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  home(){
    //this.navCtrl.setRoot(SpecialtiesPage);

    let data = {
      grant_type:"",
      client_id: "",
      client_secret:"MHGbGaurnjG0JGpyIBYGirn5BXzkKg6Wlq98KXo6",
      username: "",
      password: "",
      Destino: ""
    }

    return new Promise((resolve, reject) => {
      this.http.post(`${this.server_url}`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  forget(){
    this.navCtrl.push(ForgetPage);
  }
}
