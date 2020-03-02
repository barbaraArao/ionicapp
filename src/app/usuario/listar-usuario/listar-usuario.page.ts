import { ToastController, AlertController } from '@ionic/angular';
import { UsersService } from './../../core/service/users.service';
import { Users } from './../../models/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.page.html',
  styleUrls: ['./listar-usuario.page.scss'],
})
export class ListarUsuarioPage implements OnInit {
  users: Users[] = [];

  constructor(
    private userService: UsersService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadUsers();
  }

  async loadUsers() {
    this.users = await this.userService.getAll();
  }

  doSerchClear() {
    this.loadUsers();
  }

  async doSerchBarChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2) {
      this.users = await this.userService.filter(value);
    }
  }

  async delete(user: Users) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o contato: ${user.nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(user);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(user: Users) {
    try {
      // Removendo do banco de dados
      await this.userService.delete(user.id);

      // Removendo do array
      const index = this.users.indexOf(user);
      this.users.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Contato excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o Contato.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }
}
