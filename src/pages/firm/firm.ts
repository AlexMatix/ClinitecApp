import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../../providers/constants/constants";
import {SpecialtiesPage} from "../specialties/specialties";

/**
 * Generated class for the FirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firm',
  templateUrl: 'firm.html',
})
export class FirmPage {
  private url: any;
  private user: any;
  private email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.url = SERVER_URL;
    this.email = localStorage.getItem('email');

    this.http.get(`${this.url}/login-usuario/${this.email}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    }).subscribe((data: any) => {
      console.log(data);
      this.user = data.Usuario;
      console.log(this.user);

      if (this.user.signature !== null) {
        this.navCtrl.setRoot(SpecialtiesPage);
      }

    });
  }

  ionViewDidLoad() {
  }

}
