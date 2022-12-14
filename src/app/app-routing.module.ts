import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {AdminGuard} from "./admin/admin.guard";
import {PageErorComponent} from "./page-eror/page-eror.component";
import {HomeComponent} from "./home/home.component";



const routes: Routes = [
  {
    path:'profile',
    loadChildren: () => import('../app/profile/profile.module').then(module => module.ProfileModule),

  },
  {
  path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path:'pageEror',component:PageErorComponent},
  {
    path:'',component:HomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
