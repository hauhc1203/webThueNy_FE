import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowprofileComponent} from "./showprofile/showprofile.component";
import {EditprofileComponent} from "./editprofile/editprofile.component";

const routes: Routes = [
  {path:'show/:id',component:ShowprofileComponent},
  {path:'edit/:id',component:EditprofileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
