import {SignaturePad} from "angular2-signaturepad/signature-pad";
import {AlertController, NavController} from "ionic-angular";
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../../providers/constants/constants";
import {SpecialtiesPage} from "../../pages/specialties/specialties";
import {LoginPage} from "../../pages/login/login";
import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";

@Component({
  selector: 'firm',
  templateUrl: 'firm.html'
})
export class FirmComponent implements AfterViewInit {
  @ViewChild(SignaturePad, {static: false}) public signaturePad: SignaturePad;

  accept: boolean = false;
  @Input() idUser;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage: string;
  private url: any;

  constructor(public alertCtrl: AlertController, public http: HttpClient,
              public navCtrl: NavController) {
    this.url = SERVER_URL;
  }

  //Other Functions
  drawComplete() {
    console.log(this.accept);
    if (this.accept) {
      this.signatureImage = this.signaturePad.toDataURL();
      console.log(this.signatureImage);
      this.confirmAlert(() => {
        this.http.post(`${this.url}/pacientes-signature`, {
          id: this.idUser,
          signature: this.signatureImage,
        }, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          }
        }).subscribe(
          response => {
            this.message('Operación exitosa!', 'Se acepto los términos y conficiones satisfactoriamente');
            this.navCtrl.setRoot(SpecialtiesPage);
          },
          error => {
            this.message('Error', 'El servicio no esta disponible en este momento');
          }
        );
      });
    } else {
      console.log('No acepto');
      this.noAcceptAlert();
    }
  }

  drawClear() {
    this.signaturePad.clear();
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  noAcceptAlert() {
    let alert = this.alertCtrl.create({
      title: 'Advertencia',
      subTitle: 'Necesita aceptar los terminos y condiciones',
      buttons: ['Ok']
    });
    alert.present();
  }

  confirmAlert(callback) {
    let alert = this.alertCtrl.create({
      title: '¿Desea Continuar?',
      message: '¿Esta seguro de guardar esta firma?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Acepto',
          handler: callback
        }
      ]
    });
    alert.present();
  }

  message(title: string, body: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: body,
      buttons: ['Ok']
    });
    alert.present();
  }


  closeSession() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
}
