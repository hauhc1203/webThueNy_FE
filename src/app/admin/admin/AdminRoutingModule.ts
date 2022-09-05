import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../../login/login/login.component";
import {AdminComponent} from "./admin.component";
import {RegisterComponent} from "../../login/register/register.component";


const routes: Routes = [{
  path:'',component:AdminComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
