import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  
  { path: 'users', loadChildren: './users/user-list/user-list.module#UserListPageModule' },
  { path: 'users/new', loadChildren: './users/user-form/user-form.module#UserFormPageModule' },
  { path: 'users/edit/:id', loadChildren: './users/user-form/user-form.module#UserFormPageModule' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'termos-de-uso',
    loadChildren: () => import('./termos-de-uso/termos-de-uso.module').then( m => m.TermosDeUsoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
