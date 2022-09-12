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

  mfreeS=new Array();
  // @ts-ignore
  mbasicS=new Array();
  // @ts-ignore
  madvanceS=new Array();

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
        this.status=this.profile?.isConfirm;
        let svList=data.serviceList
        for (let d of svList){
          switch (d?.category){
            case 'free':
              // @ts-ignore
              this.mfreeS.push(d);
              break
            case 'basic':
              // @ts-ignore
              this.mbasicS.push(d);
              break
            case  'advance':
              // @ts-ignore
              this.madvanceS.push(d);
              break
          }
        }
      })


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

  ngOnInit(): void {


  }
  cancelEditPrice(){
    // @ts-ignore
    document.getElementById("inputPrice").value=this.profile.cost
    this.showEditPrice(false)
  }


  showEditPrice(check:boolean){
   if (check){
     // @ts-ignore
    $('#inputPrice').attr('readonly',false)
     $('#btnedit').css('display','none');
     $('#btncancel').css('display','block');
     $('#btnsave').css('display','block');
   }else {
     $('#btnedit').css('display','block');
     $('#btncancel').css('display','none');
     $('#btnsave').css('display','none');
     // @ts-ignore
     $('#inputPrice').attr('readonly',true)

   }
  }




  closeForm(){
    $('#formCCDV').css('display','none');

    if (this.status==0||this.status==1||(this.status==2&&this.profile.status==0)){
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
  changeStatus(){
    this.provideService.changeStatus().subscribe((data)=>{
      this.profile=data;
    })
  }
  vldP():any{
    // @ts-ignore
    let p=document.getElementById("inputPrice").value
    if (p<10000){
      $('#vldP').css('display','block');
      return false;
    }else {
      $('#vldP').css('display','none');
      return p;
    }
  }
  editPrice(){
      // @ts-ignore
    let price=this.vldP();
    if (price){
      let p={
        cost: price
      }

      this.profileS.editPrice(p).subscribe((d)=>{
        this.profile=d;
        this.showEditPrice(false);
        alert("Chỉnh sửa giá thành công")
      });

    }else {
      alert("Giá thấp nhất là 10000")
    }
  }
  editRQM(){
    // @ts-ignore
    let rqms=document.getElementById("rqm").value;
    let p={
      requirementsForHirer:rqms
    }
    this.profileS.editRQM(p).subscribe((d)=>{
      this.profile=d;
      this.showEditRQM(false);
      alert("Chỉnh sửa thành công")
    });

  }

  cancelEditRQM(){
    // @ts-ignore
    document.getElementById("rqm").value=this.profile.requirementsForHirer
    this.showEditRQM(false)
  }
  showEditRQM(check:boolean){
    if (check){
      // @ts-ignore
      $('#rqm').attr('readonly',false)
      $('#btneditT').css('display','none');
      $('#btncancelT').css('display','block');
      $('#btnsaveT').css('display','block');
    }else {
      $('#btneditT').css('display','block');
      $('#btncancelT').css('display','none');
      $('#btnsaveT').css('display','none');
      // @ts-ignore
      $('#rqm').attr('readonly',true)

    }
  }


}


