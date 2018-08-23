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
  meds: any;
  docInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.url = SERVER_URL;

    let info = {
      "Medico":1,
      "Paciente":2
    }

    this.http.get(`${this.url}/medicos/${info.Medico}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .subscribe(data =>{
      console.log(data);
      this.docInfo = data;
    })

    this.http.post(`${this.url}/ultima-receta`,info,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .subscribe(data => {
      console.log(data);
      this.recipes = data;
      this.meds = JSON.parse(this.recipes.Medicamentos)

      if(localStorage.getItem('recipe_id') !== this.recipes.id){
        localStorage.setItem('recipe_id', this.recipes.id)
        this.medsNotifications()
      }
    })

  }

  ionViewDidLoad(){}

  medsNotifications(){
      this.meds.forEach(a => {
        let hours = parseInt(a.Tiempo)
        a.Dias = 13
        let days = a.Dias
        cordova.plugins.notification.local.schedule({
          title: '¡Hora de los medicamentos! :)',
          text: `Medicamento: ${a.Medicamento} 
                 Indicaciones: ${a.Prescripcion} 
                 Cantidad: ${a.Cantidad}`,
          trigger: { every: hours, unit: 'hour', firstAt: new Date(), count: days }
        });
      });
  }

}
