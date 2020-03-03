import { ToastController, AlertController } from '@ionic/angular';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService, 
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

  async delete(user: User) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o usuario: ${user.name}?`,
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

  async executeDelete(user: User) {
    try {
      await this.userService.delete(user.id);

      const index = this.users.indexOf(user);
      this.users.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'usuario excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o usuario.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }
}
