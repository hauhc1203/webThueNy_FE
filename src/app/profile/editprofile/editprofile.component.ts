import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../service/profile.service";
import {UploadIMGService} from "../../service/upload-img.service";
import {ActivatedRoute} from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  // @ts-ignore
  id:number;
  // @ts-ignore
  profile:any;
  // @ts-ignore
  createDate:string;
  // @ts-ignore
  constructor(private profileService:ProfileService,private uploadFile:UploadIMGService,private route:ActivatedRoute) {
    // profileService.getCountry().subscribe((d)=>{
    //   this.country=d;
    //
    // });
    // profileService.getCity(1).subscribe((d)=>{
    //   this.citys=d;
    // });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = paramMap.get('id');
      this.profileService.getProfile(this.id).subscribe((data)=>{
        this.profile=data;

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
    });
  }
  ngDoCheck(){
    // let id1=
    // console.log(id1)
    // this.route.paramMap.subscribe(paramMap => {
    //   // @ts-ignore
    //   this.id = paramMap.get('id');


    // })

  }






  upfile(event:any,to:string){
    this.choosefile(event,to)
    this.uploadFile.onFileSelected(event,to)
  }


  choosefile(filename:any,to:string) {
    let id ='#'+to;
    let id2='input'+to;
    console.log(id2)
    let link= document.getElementById(id2)


    let reader = new FileReader();
    reader.onload = function (e) {
      // @ts-ignore
      $(id).attr('src', e.target.result);
    }
// @ts-ignore
    reader.readAsDataURL(link.files[0])

  }

}
