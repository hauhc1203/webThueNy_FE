import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { ProfileRoutingModule } from './profile-routing.module';
import { ServiceComponent } from './service/service.component';
import { ShowOrderByAppUserComponent } from './show-order-by-app-user/show-order-by-app-user.component';


@NgModule({
  declarations: [
    ServiceComponent,
    ShowOrderByAppUserComponent,

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
