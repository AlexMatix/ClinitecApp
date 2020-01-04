import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {SpecialtiesPage} from '../specialties/specialties';
import {RegisterPage} from '../register/register';
import {ForgetPage} from '../forget/forget';

import {ACCESS_TOKEN, SECRET, SERVER_URL} from '../../providers/constants/constants';

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
              public load: LoadingController, private alertCtrl: AlertController) {
    this.url = SERVER_URL;
    this.token = ACCESS_TOKEN;
    this.secret = SECRET;
  }

  ionViewDidLoad() {
    if (localStorage.getItem('access_token')) {
      this.navCtrl.setRoot(SpecialtiesPage);
    }
  }

  home() {
    let userInfo = {
      grant_type: "password",
      client_id: "1",
      client_secret: this.secret,
      username: this.username,
      password: this.pass,
      Destino: "Client"
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

    }, err => {
      if (err.status === 444) {
        let alert = this.alertCtrl.create({
          title: '¡Error! :(',
          subTitle: 'Su cuenta ha sido suspendida temportalmente',
          buttons: ['Ok']
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: '¡Error! :(',
          subTitle: 'Revisa la información que has introducido',
          buttons: ['Ok']
        });
        alert.present();
      }
      console.error(err);
    });

  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  forget() {
    this.navCtrl.push(ForgetPage);
  }
}
