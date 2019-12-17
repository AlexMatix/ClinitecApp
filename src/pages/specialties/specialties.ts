import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LocalNotifications} from '@ionic-native/local-notifications';

import {DoctorsPage} from '../doctors/doctors';
import {DatingPage} from '../dating/dating';
import {PatientProfilePage} from '../patient-profile/patient-profile';
import {DoctorProfilePage} from '../doctor-profile/doctor-profile';
import {AllPatientsPage} from '../all-patients/all-patients';
import {RecipesPage} from '../recipes/recipes';
import {LoginPage} from '../login/login'

import {SERVER_URL} from '../../providers/constants/constants';

@IonicPage()
@Component({
  selector: 'page-specialties',
  templateUrl: 'specialties.html',
})
export class SpecialtiesPage {
  url: string = "";
  email: string = "";
  user: any;
  userinfo: Observable<any>;
  allSpecialties: any = [{'Especialidad': 'cardiologia'},
    {'Especialidad': 'estomatologia'},
    {'Especialidad': 'neurologia'},
    {'Especialidad': 'pediatria'}];

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient, public localNotifications: LocalNotifications) {

    this.email = localStorage.getItem('email');
    this.menu.enable(true, 'menu');
    this.url = SERVER_URL;

    this.userinfo = this.http.get(`${this.url}/login-usuario/${this.email}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    this.userinfo
      .subscribe(data => {
        console.log(data);
        this.user = data.Usuario;
        console.log(this.user);
        // this.user.signature = null;
        localStorage.setItem('mcenter_id', data.Usuario.idCentro_medico);
        localStorage.setItem('id', data.Usuario.id);
        localStorage.setItem('name', data.Usuario.Nombre);
        localStorage.setItem('lastName', data.Usuario.Apellidos);
        localStorage.setItem('phone', data.Usuario.Telefono);

        this.http.get(`${this.url}/especialidades/${localStorage.getItem('mcenter_id')}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          }
        })
          .subscribe(data => {
            console.log(data);
            this.allSpecialties = data;
          })
      })
  }

  ionViewDidLoad() {
  }

  selectOne(value) {
    this.navCtrl.push(DoctorsPage, {'specialitie': value});
  }

  dating() {
    this.navCtrl.push(DatingPage);
  }

  patient_profile() {
    this.navCtrl.push(PatientProfilePage);
  }

  doctor_profile() {
    this.navCtrl.push(DoctorProfilePage);
  }

  allPatients() {
    this.navCtrl.push(AllPatientsPage);
  }

  recipes() {
    this.navCtrl.push(RecipesPage);
  }

  exit() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
}
