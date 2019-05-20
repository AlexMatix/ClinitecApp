import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpecialtiesPage } from '../specialties/specialties';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';

import { SERVER_URL, ACCESS_TOKEN, SECRET } from '../../providers/constants/constants';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string = "";
  pass: string = "";
  url: string = "";
  token: string = "";
  secret: string = "";
  login: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
              public load: LoadingController) {
    this.url = SERVER_URL;
    this.token = ACCESS_TOKEN;
    this.secret = SECRET;
  }

  ionViewDidLoad() {
    if(localStorage.getItem('access_token')){
      this.navCtrl.setRoot(SpecialtiesPage);
    }
  }

  home(){
    let userInfo = {
      grant_type:"password",
      client_id: "1",
      client_secret: this.secret,
      username: this.username,
      password: this.pass,
      Destino: "ClientMovil"
    }
    
    this.login = this.http.post(`${this.url}/oauth/token`, userInfo, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      }
    });

    this.login.subscribe(data => {
      console.log(data);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('email', this.username);
      
      let loading = this.load.create({
        content: 'Espere un momento...'
      });
    
      loading.present();
    
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.setRoot(SpecialtiesPage);
      }, 2000);

    });

  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  forget(){
    this.navCtrl.push(ForgetPage);
  }
}
