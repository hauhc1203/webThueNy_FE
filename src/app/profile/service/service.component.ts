import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ProvideServiceService} from "../../service/provide-service.service";
import * as $ from "jquery";
import {ProfileService} from "../../service/profile.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  // @ts-ignore
  roleCCDV:string;
  allService:any;
  // @ts-ignore
  freeS=new Array();
  // @ts-ignore
  basicS=new Array();
  // @ts-ignore
  advanceS=new Array();
  checkPrice:boolean=false;
  profile:any;

  // @ts-ignore
  status:number;

  constructor(private loginService:LoginService,private provideService:ProvideServiceService,private  profileS:ProfileService) {
      // @ts-ignore
      let uT=this.loginService.getUserToken();
      let yourID=uT.id;
      profileS.getProfile(yourID).subscribe((data)=>{
        this.profile=data;
        console.log(this.profile)
        this.status=this.profile?.isConfirm;
      })


    // @ts-ignore
    this.roleCCDV=this.loginService.containsRole('ROLE_CCDV',uT);
    if (this.roleCCDV){
      this.provideService.getServiceByProfile(yourID).subscribe((d)=>{
        console.log(d)
      })
    }
    this.provideService.getAllService().subscribe((data)=>{
      this.allService=data;
      for (let d of data){
        switch (d?.category){
          case 'free':
            // @ts-ignore
            this.freeS.push(d);
            break
          case 'basic':
            // @ts-ignore
            this.basicS.push(d);
            break
          case  'advance':
            // @ts-ignore
            this.advanceS.push(d);
            break
        }
      }
    })
  }

  ngOnInit(): void {


  }
  closeForm(){
    console.log(this.status)
    $('#formCCDV').css('display','none');
    if (this.status==1||this.status==0||this.status==3){
      $('#newbie-alert').css('display','block');
    }else {
      $('#ccdvM').css('display','flex');

    }
  }
  showForm(){

     if (this.status!=1&&this.status!=0&&this.status!=3){
       $('#ccdvM').css('display','none');
       $('#newbie-alert').css('display','none');
       $('#formCCDV').css('display','block');

     }else {
       alert("bạn cần hoàn thiện thông tin và xác minh profile trước")
     }

  }
  checkService(arr1:any[],arr2:any[]):boolean{
    for (let a of arr1){
      for (let b of arr2){
        if (a==b.id){
          return true;
        }
      }
    }
    return false;
  }

  getService():any[]{
    let serviceids=new Array();
    let sv=document.querySelectorAll('.form-check-input')
    // @ts-ignore
    for (let s of sv) {
      // @ts-ignore
      if (s?.checked){
        serviceids.push(s.value);
      }
    }
    return serviceids;
  }
  cf(){
    let serviceids=this.getService();

    if (this.checkService(serviceids,this.basicS)&&this.checkService(serviceids,this.freeS)&&this.checkService(serviceids,this.advanceS)){
      // @ts-ignore
      let cost=document.getElementById("cost").value;
      if (cost<10000){
        this.checkPrice=true;
      }else {
        serviceids.push(cost)
        this.provideService.registerService(serviceids).subscribe(()=>
        {
          alert("Đăng ký thành công, bạn cần đăng nhập lại để tiếp tục")
          this.loginService.logout()
        })

      }


    }else {
      alert("You must choose at least 1 service of each type")
    }



  }


}
