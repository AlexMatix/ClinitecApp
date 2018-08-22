import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { SERVER_URL } from '../../providers/constants/constants';

declare var cordova;

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: any = []
  url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.url = SERVER_URL;

    this.http.get(`${this.url}/especialidades/${localStorage.getItem('mcenter_id')}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .subscribe(data => {
      console.log(data);
      this.recipes = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  meds(){
      let e = JSON.parse(this.recipes.Medicamentos);
      e.forEach(a => {
        let hours = parseInt(a.Tiempo)
        let days = 13
        cordova.plugins.notification.local.schedule({
          title: '¡Hora de los medicamentos! :)',
          text: `Medicamento: ${a.Medicamento} Indicaciones: ${a.Descripcion} Cantidad: ${a.Cantidad}`,
          trigger: { every: hours, unit: 'hour', firstAt: new Date(), count: days }
        });
      });
  }

}
