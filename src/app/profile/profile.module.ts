import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { ProfileRoutingModule } from './profile-routing.module';
import { ServiceComponent } from './service/service.component';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [
    ServiceComponent,
    OrderComponent,

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // ShowOrderByAppUserComponent
  ]
})
export class ProfileModule { }
