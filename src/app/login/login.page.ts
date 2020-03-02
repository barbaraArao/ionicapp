import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  messagecpf = ""
  messagesenha = "";
  errorcpf = false;
  errorsenha = false;
  constructor(public navCtrl: NavController, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      cpf: ['', Validators.compose([Validators.minLength(14), Validators.maxLength(14), Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6),
      Validators.required])],
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad WelcomePage');
  }

  login() {
    let { cpf, senha } = this.loginForm.controls;
    if (!this.loginForm.valid) {
      if (!cpf.valid) {
        this.errorcpf = true;
        this.messagecpf = "Ops! cpf inválido";
      } else {
        this.messagecpf = "";
      }

      if (!senha.valid) {
        this.errorsenha = true;
        this.messagesenha = "A senha precisa ter de 6 a 20 caracteres"
      } else {
        this.messagesenha = "";
      }
    }
    else {
      alert("Login Realizado");
      // this.navCtrl.push('HomePage');
    }
  }

  signup() {
    // this.navCtrl.push('SignupPage');
  }

}
