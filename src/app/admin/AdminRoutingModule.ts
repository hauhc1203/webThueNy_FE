import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";

import {AdminGuard} from "./admin.guard";
import {ShowprofileComponent} from "../profile/showprofile/showprofile.component";
import {ShowOrderDetailComponent} from "./show-order-detail/show-order-detail.component";


const routes: Routes = [{
    path:'',component:AdminComponent
  },
  {
    path:'showOrder', component: ShowOrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
