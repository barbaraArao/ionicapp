import { SQLite } from '@ionic-native/sqlite/ngx';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { CardUsuarioComponent } from './listar-usuario/card-usuario/card-usuario.component';
import { CadastrarUsuarioPage } from './cadastrar-usuario/cadastrar-usuario.page';
import { ListarUsuarioPage } from './listar-usuario/listar-usuario.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CadastrarUsuarioPage,
    ListarUsuarioPage,
    CardUsuarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    NgxMaskIonicModule,
  ]
})
export class UsuarioModule { }
