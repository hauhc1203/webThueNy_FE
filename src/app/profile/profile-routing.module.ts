import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowprofileComponent} from "./showprofile/showprofile.component";
import {EditprofileComponent} from "./editprofile/editprofile.component";
import {ServiceComponent} from "./service/service.component";
import {LoginGuard} from "../guard/login.guard";

import {OrderComponent} from "./order/order.component";
import {WalletComponent} from "./wallet/wallet.component";
const routes: Routes = [
  {
    path:'show/:id',component:ShowprofileComponent
  },
  {
    path:'edit',
    component:EditprofileComponent,
    canActivate:[LoginGuard]
  },
  {path:'service',component:ServiceComponent,
    canActivate:[LoginGuard]
  },

  {path:'order',component:OrderComponent,
    canActivate:[LoginGuard]

  },
  {
    path: 'wallet', component: WalletComponent,
    canActivate:[LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
