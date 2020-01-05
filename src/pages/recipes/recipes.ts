import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { SERVER_URL } from '../../providers/constants/constants';

// declare var cordova;

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: any = [];
  url: string;
  meds: any;
  docInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController) {
    this.url = SERVER_URL;

    let info = {
      "Paciente": localStorage.getItem('id')
    };

    this.http.post(`${this.url}/ultima-receta`, info, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .subscribe(data => {
        console.log(data);
        this.recipes = data;
        for (let i = 0; i < this.recipes.length; i++) {
          this.recipes[i].Medicamentos = JSON.parse(this.recipes[i].Medicamentos);
        }

      })

  }

  ionViewDidLoad() { }

  deleteRecipe(id) {
    let alert = this.alertCtrl.create({
      title: '¿Deseas borrar la receta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log(':)');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.http.delete(`${this.url}/ultima-receta/${id}`, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
              }
            })
              .subscribe(data => {
                console.log(data);
                this.navCtrl.setRoot(this.navCtrl.getActive().component);
              })
          }
        }
      ]
    });
    alert.present();
  }

}
