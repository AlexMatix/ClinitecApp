import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//import { SpecialtiesPage } from '../specialties/specialties';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string = "";
  pass: string = "";
  url: string = "http://167.99.224.27:81";
  headers = new HttpHeaders();
  login: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQxNDI0YWZjZmZlZmNiZTRiMGViNjBmMDhlM2I0ODBmNzJlYTAwYmQ5ZjQ2OGE4ZWRkMzQ2ODM4NWM5MTAyYjNjYzBmZGRiZTNkMGE1MWUyIn0.eyJhdWQiOiIxIiwianRpIjoiNDE0MjRhZmNmZmVmY2JlNGIwZWI2MGYwOGUzYjQ4MGY3MmVhMDBiZDlmNDY4YThlZGQzNDY4Mzg1YzkxMDJiM2NjMGZkZGJlM2QwYTUxZTIiLCJpYXQiOjE1MzExOTU4OTYsIm5iZiI6MTUzMTE5NTg5NiwiZXhwIjoxNTYyNzMxODk2LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.IHXaCOQGDWzayzKqPEwrVpf_vNWxxRIqWAn3XjtpHtZoxongoozfrwL_poqZMhmRI9V0zOB03fdNxjxOkndIUJMeV6zxjZuNoeQraVLmK9JQG5CsCMfZMV-O8CylBpDDPvQivBZrh6jkKwa8-dRbkZLjVswtbOIpf9xElmMPxuN75wumO-Wn5v2x6luGBC1xf-amr0nFySBXCO3jkhT4ANs5e8aIep9pwj64xuVn6OEypvXloJA377XORb2Q0RQVh0RMi2ZdoA2XSlF9KrI3-fSJP9MIQhXbG14IUTnKKfxVRq9WVnnVcL6k5iFc62nLu1JJA6JPXNb4JocZsj9Q9BPoiwF4IezV8HakeeXAtfPws_1l8K7ROKgI551PVNRl5i9xk_fcO5jeefX8YePCXf6AoQi7AWdsoxgZMXXWaOaSigadr2rjKGW_qbWARiusC-ahNoW-h0fsxgfqPJAqiNC08ESDf6MGx3mB88L5nAP_aOkkAn-q2FLULIvcQGqKeXnFD0f8ocrYeddsKV32oc09W165J5lN_ruFHguTBvgKl5K9miyHgcZhaKEfkN-rOO4uN7gaNYSz1cDGYYfG-yAfB3NB0rBq4EcODchX4MjwvaJ4ubhPCVxDOs8yBkHyOebt6S1HO7ObgCyjPgKxdctYpZrTdKP4Qv8-V1cTlPI');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  home(){
    let userInfo = {
      grant_type:"password",
      client_id: "1",
      client_secret:"MHGbGaurnjG0JGpyIBYGirn5BXzkKg6Wlq98KXo6",
      username: "medicotest@gmail.com",
      password: "secret",
      Destino: "ClientMovil"
    }
    this.login = this.http.post(`${this.url}/oauth/token`, userInfo, {
      headers: {
        "Content-Type": "application-json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    this.login
    .subscribe(data => {
      console.log(data);
      //this.navCtrl.setRoot(SpecialtiesPage);
    })

  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  forget(){
    this.navCtrl.push(ForgetPage);
  }
}
