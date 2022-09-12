import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowprofileComponent} from "./showprofile/showprofile.component";
import {EditprofileComponent} from "./editprofile/editprofile.component";
import {ServiceComponent} from "./service/service.component";
import {LoginGuard} from "../guard/login.guard";
import {ShowOrderByAppUserComponent} from "./show-order-by-app-user/show-order-by-app-user.component";

const routes: Routes = [
  {path:'show/:id',component:ShowprofileComponent},
  {
    path:'edit/:id',
    component:EditprofileComponent,
    canActivate:[LoginGuard]
  },
  {path:'service',component:ServiceComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'showOrderByAppUser',component:ShowOrderByAppUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
