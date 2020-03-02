import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarUsuarioPage } from '../usuario/listar-usuario/listar-usuario.page';

import { CadastrarUsuarioPage } from '../usuario/cadastrar-usuario/cadastrar-usuario.page';


const routes: Routes = [
	{
		path: 'listar',
		component: ListarUsuarioPage
	},
	{
		path: 'cadastro',
		component: CadastrarUsuarioPage
	},
	{
		path: 'edit/:id',
		component: CadastrarUsuarioPage
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsuarioRoutingModule { }
