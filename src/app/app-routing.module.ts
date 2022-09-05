import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {AdminComponent} from "./admin/admin/admin.component";
import {AdminGuard} from "./admin/admin/admin.guard";
import {PageErorComponent} from "./page-eror/page-eror.component";

const routes: Routes = [{
  path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/admin/admin/admin.module').then(module => module.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path:'pageEror',component:PageErorComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
