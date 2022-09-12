import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../service/profile.service";
import {LoginService} from "../../service/login.service";
import {UploadIMGService} from "../../service/upload-img.service";
import * as $ from 'jquery'
import { Router,ActivatedRoute, ParamMap} from "@angular/router";
import {WalletService} from "../../service/wallet.service";
import {data} from "jquery";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {OrderService} from "../../service/order.service";
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

  mfreeS:any;
  // @ts-ignore
  mbasicS:any ;
  // @ts-ignore
  madvanceS:any;

  wallet:any;

  // @ts-ignore
  total:number;
  // @ts-ignore
  islogin:boolean;

  constructor(private orderS:OrderService,private walletS:WalletService,private profileService:ProfileService,private uploadFile:UploadIMGService,private route:ActivatedRoute,private loginS:LoginService,private router:Router) {
    let ut=this.loginS.getUserToken();
    this.islogin=ut!=null
    if (this.islogin){
      this.walletS.getWallet().subscribe((data)=>{
        this.wallet=data;
      })
    }
    this.route.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = paramMap.get('id');
      this.isYourP=ut?.id==this.id;
      this.profileService.getProfile(this.id).subscribe((data)=>{
        this.profile=data;
        let svList=data.serviceList;
        this.mfreeS=new Array();
        // @ts-ignore
        this.mbasicS=new Array();
        // @ts-ignore
        this.madvanceS=new Array();
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
  ngOnInit(): void {



  }


  showFormHire(){
    // let $j=jQuery.noConflict();
    // console.log($j)
    // // @ts-ignore
    // $j('#date-hire').datepicker({
    //   dateFormat:'dd-mm-yy'
    // });
    if (this.islogin){
      let sv=document.querySelectorAll('.form-check-input')
      // @ts-ignore
      for (let s of sv) {
        s.addEventListener('click', ()=>{
          this.updateTotal();
        })
      }
      this.updateTotal();
    }else {
      this.router.navigate(["login"]);
    }

  }

  getAService():any{
    let aS=new Array();
    let sv=document.querySelectorAll('.form-check-input')
    // @ts-ignore
    for (let s of sv) {
      // @ts-ignore
      if (s?.checked){
        aS.push(s.value);
      }
    }
    return aS;
  }
  updateTotal(){

      // @ts-ignore
    let sogiothue=document.getElementById("sogiothue").value
    let price=this.profile.cost;
    let soAS=this.getAService().length
    this.total=sogiothue*price +soAS*150000
    if (this.total>this.wallet?.amount){
      // @ts-ignore
      $('#createBTN').attr("disabled", true);
    }
  }


  create(){
    let aS=this.getAService();
    // @ts-ignore
    let bS=document.getElementById("basicS").value;
    if (bS){
      aS.push(bS)
    }
    // @ts-ignore
    let dh=document.getElementById("date-hire").value

    // @ts-ignore
    let st=document.getElementById("startTime").value

    // @ts-ignore
    let sogiothue=document.getElementById("sogiothue").value
    // @ts-ignore
    let mfu=document.getElementById("mfu").value


    let order={
      time:sogiothue,
      startTime:st,
      datingTime:dh,
      profile:{
        id:this.profile.id
      },
      messFromUser:mfu,
      total:this.total


    }
    this.orderS.createOrder(order,aS).subscribe(()=>{
      alert("Create order successfull")
    })
  }
}
