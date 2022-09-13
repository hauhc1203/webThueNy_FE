import {Component, DoCheck, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";
import  * as $ from 'jquery'
import {HomeService} from "../service/home.service";
import {data} from "jquery";
import {Profile} from "../models/Profile";
import {ProfileService} from "../service/profile.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {
  profiles!:Profile[]
  profiless!:Profile[]


  token:string='';
  // @ts-ignore
  newccdvs:any[];
  // @ts-ignore
  vipccdvs:any[];
  // @ts-ignore
  nearvvdvs:any[];
  // @ts-ignore
  isLogin:boolean;
  ut:any;

  constructor(private loginService:LoginService,private homeS:HomeService,private profileService:ProfileService) {
      homeS.newCCDV().subscribe((data)=>{
        this.newccdvs=data;
      })
      homeS.vipCCDV().subscribe((data)=>{
        this.vipccdvs=data
      })
    this.ut=loginService.getUserToken();
    this.isLogin=this.ut!=null;
    if (this.isLogin){
      this.getNear(0);

    }
  }

  getNear(page:number){
    this.homeS.near(page).subscribe((data)=>{
      this.nearvvdvs=data.content
    })
  }

  ngDoCheck(){
    // @ts-ignore
    this.token=this.loginService.getToke()
  }

  ngOnInit(): void {
    // @ts-ignore
    this.profileService.showUserBoy().subscribe((data)=>{
      this.profiles=data})

    this.profileService.showUserGirl().subscribe((data)=>{
      this.profiless=data})


  }

}
