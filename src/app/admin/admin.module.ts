import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./AdminRoutingModule";
import {ShowOrderDetailComponent} from "./show-order-detail/show-order-detail.component";
import { TurnoverComponent } from './turnover/turnover.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [

    TurnoverComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }
