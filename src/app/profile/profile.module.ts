import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { ProfileRoutingModule } from './profile-routing.module';
import { ServiceComponent } from './service/service.component';


@NgModule({
  declarations: [
    ServiceComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
