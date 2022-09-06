import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowprofileComponent} from "./showprofile/showprofile.component";
import {EditprofileComponent} from "./editprofile/editprofile.component";
import {ServiceComponent} from "./service/service.component";

const routes: Routes = [
  {path:'show/:id',component:ShowprofileComponent},
  {path:'edit/:id',component:EditprofileComponent},
  {path:'service',component:ServiceComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
