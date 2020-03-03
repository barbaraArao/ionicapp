import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {  UserService } from '../shared/user.service';
import {  User } from '../shared/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage implements OnInit {
  title: string = 'Novo usuario';
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute, 
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.user = new User();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.title = 'Editar usuario';
      this.loadUser(parseInt(idParam));
    }
  }
  
  async loadUser(id: number) {
    this.user = await this.userService.getById(id);
  }

  async onSubmit() {
    try {
      const result = await this.userService.save(this.user);
      this.user.id = result.insertId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'usuario salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
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
