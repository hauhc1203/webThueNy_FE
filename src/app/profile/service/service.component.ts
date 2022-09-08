import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ProvideServiceService} from "../../service/provide-service.service";
import * as $ from "jquery";
import {ProfileService} from "../../service/profile.service";

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
  constructor(private loginService:LoginService,private provideService:ProvideServiceService,private profileS:ProfileService) {

  }

  ngOnInit(): void {
    this.profile=this.profileS.profile;
    let uT=this.loginService.getUserToken();
    // @ts-ignore
    this.roleCCDV=this.loginService.containsRole('ROLE_CCDV',uT);
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
  showForm(){
     if (this.profile.isConfirm){
       $('#newbie-alert').css('display','none');
       $('#formCCDV').css('display','block');
     }else {
       alert("bạn cần hoàn thiện thông tin profile trước")
     }
     
  }

  cf(){
    let serviceids=new Array();
    let sv=document.querySelectorAll('.form-check-input')
    // @ts-ignore
    for (let s of sv) {
      // @ts-ignore
     if (s?.checked){
       serviceids.push(s.value);
     }
    }

    if (serviceids.length<3){
      alert("You must choose at least 3 services")
    }else {
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
    }



  }


}
