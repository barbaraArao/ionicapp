import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from '../users/shared/user.service';

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
  constructor(public navCtrl: NavController, private fb: FormBuilder,    private userService: UserService,
    private route: ActivatedRoute, private router: Router,    private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      cpf: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(14), Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6),
      Validators.required])],
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad WelcomePage');
  }

  async login() {
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
        this.messagesenha = "A senha precisa ter de no mínimo 6 caracteres"
      } else {
        this.messagesenha = "";
      }
    }
    else {
      if(this.userService.getLogin(cpf.value, senha.value) !== null){
      this.router.navigate(['/users'])
     }
      else{
        const toast = await this.toastCtrl.create({
          header: 'Erro',
          message: 'Ocorreu um erro ao tentar salvar o usuario.',
          color: 'danger',
          position: 'bottom',
          duration: 3000
        });
  
        toast.present();
      }
    }
  }
   signup(){
    this.router.navigate(['/users/new'])  }


}
