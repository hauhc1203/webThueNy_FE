import {Component, DoCheck, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";
import  * as $ from 'jquery'
import {HomeService} from "../service/home.service";
import {data} from "jquery";
import {Profile} from "../models/Profile";
import {FormControl, FormGroup} from "@angular/forms";
import {ProfileService} from "../service/profile.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {
  profiless!:Profile[]


  profiles :Profile[]=[];

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
  citys:any

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
    // @ts-ignore
    this.profileService.showUserBoy().subscribe((data)=>{
      this.profiles=data})

    this.profileService.showUserGirl().subscribe((data)=>{
      this.profiless=data})
    this.profileService.getALl().subscribe((data)=>{
      this.profiles=data
    });
    this.profileService.getCity(1).subscribe((d) => {
      this.citys = d;
    });

  }

  searchForm:any = new FormGroup({
    address:new FormControl(),
    gender:new FormControl(),
    birthyear:new FormControl(),
    fullName:new FormControl(),
    views:new FormControl(),
    hireTimes:new FormControl(),
  })
  p: any;


  search(){
    console.log(this.searchForm.value)

    let search = {
      idCity:this.searchForm.value.address,
      gender : this.searchForm.value.gender,
      minAgeAndMaxAge : this.searchForm.value.birthyear,
      fullName : this.searchForm.value.fullName,
      views : this.searchForm.value.views,
      hireTimes : this.searchForm.value.hireTimes

    }
    this.profileService.search(search).subscribe((data)=>{
      this.profiles=data;
      console.log(data)
    })
  }



}
