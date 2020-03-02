import { Users } from './../../models/users';
import { UsersService } from './../../core/service/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {
  public cadastro: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.cadastro = this.fb.group({
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      data_nascimento: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, Validators.required],
      senha: [null, Validators.required],
      termos_de_uso: [null, Validators.required],
      id: [null]
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.title = 'Editar contato';
      this.loaduser(parseInt(idParam));
    }
  }

  async loaduser(id: number) {
    this.user = await this.userService.getById(id);
  }

  async onSubmit() {
    try {
      const result = await this.userService.save(this.user);
      this.user.id = result.insertId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Contato salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o Contato.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

  title: string = 'Novo contato';
  user: Users;


}
