import { Component } from '@angular/core';
import {LoginService} from "./service/login.service";
import {Router} from "@angular/router";
import {LoginComponent} from "./login/login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectA';
  token:string='';
  userName:string=''
  constructor(private loginService:LoginService,private router:Router)  {
    // // @ts-ignore
    // this.token=localStorage.getItem('token')
    // // @ts-ignore
    // this.userName=localStorage.getItem('un');
  }
  ngDoCheck(){
    // @ts-ignore
    this.token=localStorage.getItem('token')
    // @ts-ignore
    this.userName=localStorage.getItem('un');
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(["/login"])
  }

}
