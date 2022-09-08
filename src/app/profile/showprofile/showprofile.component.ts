import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../service/profile.service";
import {LoginService} from "../../service/login.service";
import {UploadIMGService} from "../../service/upload-img.service";
import * as $ from 'jquery'
import { Router,ActivatedRoute, ParamMap} from "@angular/router";
@Component({
  selector: 'app-showprofile',
  templateUrl: './showprofile.component.html',
  styleUrls: ['./showprofile.component.css']
})
export class ShowprofileComponent implements OnInit {
  // @ts-ignore
  id:number;
  // @ts-ignore
  profile:any;
  // @ts-ignore
  createDate:string;
  // @ts-ignore

  isYourP:boolean;
  constructor(private profileService:ProfileService,private uploadFile:UploadIMGService,private route:ActivatedRoute,private loginS:LoginService) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = paramMap.get('id');
      this.isYourP=this.loginS.getUserToken().id==this.id;
      this.profileService.getProfile(this.id).subscribe((data)=>{
      this.profile=data;
      this.profileService.profile=data;
      let day=new Date(this.profile.createDate)
      let m:any=day.getMonth()+1
      if (m<10){
        m="0"+m;
      }
      let date:any=day.getDate()
      if (date<10){
        date="0"+date;
      }
      this.createDate=date+"-"+m+"-"+day.getFullYear()
    });
    });


  }




}
