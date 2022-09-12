import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./AdminRoutingModule";
import {ShowOrderDetailComponent} from "./show-order-detail/show-order-detail.component";
import {ShowOrderByAppUserComponent} from "../profile/show-order-by-app-user/show-order-by-app-user.component";



@NgModule({
  declarations: [
    // ShowOrderByAppUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
