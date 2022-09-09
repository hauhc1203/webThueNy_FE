import {Component, DoCheck, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";
import {ProfileService} from "../service/profile.service";
import {data} from "jquery";
import {Profile} from "../models/Profile";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {
  profiles:Profile[] =[]

  token:string='';
  constructor(private loginService:LoginService,private profileService:ProfileService) {

  }


  ngDoCheck(){
    // @ts-ignore
    this.token=this.loginService.getToke()
  }

  ngOnInit(): void {
    this.profileService.getProfileByView().subscribe((data)=>{
      this.profiles=data

    })
  }



}
