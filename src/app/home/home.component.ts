import {Component, DoCheck, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";
import  * as $ from 'jquery'
import {HomeService} from "../service/home.service";
import {data} from "jquery";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {

  token:string='';
  // @ts-ignore
  newccdvs:any[];
  // @ts-ignore
  vipccdvs:any[];
  // @ts-ignore
  nearvvdvs:any[];
  // @ts-ignore
  byGender:any[];
  // @ts-ignore
  isLogin:boolean;
  ut:any;

  constructor(private loginService:LoginService,private homeS:HomeService) {
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
      this.getProfileByGender(0)
    }
  }

  getNear(page:number){
    this.homeS.near(page).subscribe((data)=>{
      this.nearvvdvs=data.content
    })
  }
  getProfileByGender(page:number){
    this.homeS.getProfileByGender(page).subscribe((data)=>{
      this.byGender=data.content
    })
  }

  ngDoCheck(){
    // @ts-ignore
    this.token=this.loginService.getToke()
  }

  ngOnInit(): void {
  }



}
