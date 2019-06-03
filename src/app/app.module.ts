import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {LocalNotifications} from '@ionic-native/local-notifications';

import {MyApp} from './app.component';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {SpecialtiesPage} from '../pages/specialties/specialties';
import {ForgetPage} from '../pages/forget/forget';
import {DoctorsPage} from '../pages/doctors/doctors';
import {DprofilePage} from '../pages/dprofile/dprofile';
import {DatingPage} from '../pages/dating/dating';
import {PatientProfilePage} from '../pages/patient-profile/patient-profile';
import {DoctorProfilePage} from '../pages/doctor-profile/doctor-profile';
import {AllPatientsPage} from '../pages/all-patients/all-patients';
import {RecipesPage} from '../pages/recipes/recipes';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    SpecialtiesPage,
    ForgetPage,
    DoctorsPage,
    DprofilePage,
    DatingPage,
    PatientProfilePage,
    DoctorProfilePage,
    AllPatientsPage,
    RecipesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
