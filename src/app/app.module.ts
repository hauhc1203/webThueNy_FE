import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import { PageErorComponent } from './page-eror/page-eror.component';

import {AuthInterceptor} from "./auth.interceptor";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { ShowprofileComponent } from './profile/showprofile/showprofile.component';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import {AdminComponent} from "./admin/admin/admin.component";
import {LoginGuard} from "./guard/login.guard";
import {NgxPaginationModule} from "ngx-pagination";
import { ShowOrderDetailComponent } from './admin/show-order-detail/show-order-detail.component';
import {ShowOrderByAppUserComponent} from "./profile/show-order-by-app-user/show-order-by-app-user.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    PageErorComponent,
    HomeComponent,
    ShowprofileComponent,
    EditprofileComponent,
    ShowOrderDetailComponent,
    // ShowOrderByAppUserComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
        NgxPaginationModule
    ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
