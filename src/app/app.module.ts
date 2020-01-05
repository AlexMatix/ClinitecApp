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

import {LoginPageModule} from "../pages/login/login.module";
import {RegisterPageModule} from "../pages/register/register.module";
import {SpecialtiesPageModule} from "../pages/specialties/specialties.module";
import {ForgetPageModule} from "../pages/forget/forget.module";
import {DoctorsPageModule} from "../pages/doctors/doctors.module";
import {DprofilePageModule} from "../pages/dprofile/dprofile.module";
import {DatingPageModule} from "../pages/dating/dating.module";
import {PatientProfilePageModule} from "../pages/patient-profile/patient-profile.module";
import {DoctorProfilePageModule} from "../pages/doctor-profile/doctor-profile.module";
import {AllPatientsPageModule} from "../pages/all-patients/all-patients.module";
import {RecipesPageModule} from "../pages/recipes/recipes.module";
import {FirmPage} from "../pages/firm/firm";
import {FirmPageModule} from "../pages/firm/firm.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {ErrorHandler, NgModule} from "@angular/core";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    LoginPageModule,
    RegisterPageModule,
    SpecialtiesPageModule,
    ForgetPageModule,
    DoctorsPageModule,
    DprofilePageModule,
    DatingPageModule,
    PatientProfilePageModule,
    DoctorProfilePageModule,
    AllPatientsPageModule,
    RecipesPageModule,
    FirmPageModule
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
    RecipesPage,
    FirmPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
