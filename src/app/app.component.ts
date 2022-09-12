import { Component } from '@angular/core';
import {LoginService} from "./service/login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectA';
  token:string='';
  userName:string=''
  // @ts-ignore
  idAppuser:number;
  constructor(private loginService:LoginService)  {
    let thisismyredirect = true;
      window.onbeforeunload=function(ev:any) {
        console.log(ev.name)
       if (!thisismyredirect){
         loginService.logout();
       }
      }
  }
  ngDoCheck(){
    // @ts-ignore
    this.token=localStorage.getItem('token')
    // @ts-ignore
    let userToken=this.loginService.getUserToken();
    this.idAppuser=userToken?.id;
    this.userName=userToken?.userName;
  }
  logout(){
    this.loginService.logout();
  }

}
