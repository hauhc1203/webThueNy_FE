import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../service/profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {UploadIMGService} from "../service/upload-img.service";
import * as $ from  'jquery';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:number=0;
  // @ts-ignore
  country:any[];
  // @ts-ignore
  city:any[];
  profile:any;
  // @ts-ignore
  createDate:string;
  // @ts-ignore
  citydropdown=0;
  countrydropdown=0;
  constructor(private profileService:ProfileService,private  loginService:LoginService,private uploadFile:UploadIMGService) {
    // @ts-ignore
    this.id=loginService.getUserToken().id;
    profileService.getProfile(this.id).subscribe((data)=>{
      this.profile=data;
      // @ts-ignore
      this.citydropdown=data.city.id;
      this.countrydropdown=data.country.id;
      let day=new Date(this.profile.createDate)
      let m:any=day.getMonth()+1
      if (m<10){
        m="0"+m;
      }
      let date:any=day.getDate()
      if (date<10){
        date="0"+date;
      }

      this.createDate=day.getFullYear()+"-"+m+"-"+date

    });

    profileService.getCountry().subscribe((d)=>{
      this.country=d;

    });
    profileService.getCity(1).subscribe((d)=>{
      this.city=d;
    });

  }



  profileForm=new FormGroup({
    fullName: new FormControl("",Validators.required),
    high: new FormControl(0,Validators.required),
    weight: new FormControl(0,[Validators.required,Validators.min(40),Validators.max(200)]),
    hobby:new FormControl("",Validators.required),
    introduction:new FormControl("",Validators.required),
    facebookLink:new FormControl("",Validators.required),
    requirementsForHirer:new FormControl("",Validators.required),
    country:new FormControl("",Validators.required),
    city:new FormControl("",Validators.required),
    birthDay:new FormControl('',Validators.required),
    img1:new FormControl("",Validators.required),
    img2:new FormControl("",Validators.required),
    img3:new FormControl("",Validators.required),


    // country: new FormControl("abcd1234",Validators.required)
  })
  save(){
    console.log(this.profileForm.value)
  }


  ngOnInit(): void {
  }

 async upfile(event:any){
    this.uploadFile.onFileSelected(event)
  }


  choosefile(filename:any) {
    let link= document.getElementById("duphong")
    if (filename.files[0]!=undefined){
      // @ts-ignore
      link.files=filename.files;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
      // @ts-ignore
      $('#avatar').attr('src', e.target.result);
    }
    // @ts-ignore
    reader.readAsDataURL(link.files[0])

  }

}
