import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ProfileService} from "../../service/profile.service";
import {OrderService} from "../../service/order.service";
import {FeedbackService} from "../../service/feedback.service";
import {ReportService} from "../../service/report.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  // @ts-ignore
  id:number;
  uT:any;
  profile:any;
  pages:any;
  // @ts-ignore
  isL:boolean;
  // @ts-ignore
  isF:boolean;
  pages1:any;
  // @ts-ignore
  yourOrders:any[];

  // @ts-ignore
  services:any[];

  // @ts-ignore
  yourOrdersNull:boolean;
  // @ts-ignore
  hiredOrdersNull:boolean;
  // @ts-ignore
  hiredOrders:any[];

  hiredOrder:any;

  feedback:any;

  partnerFB:any;
  myFB:any;

  // @ts-ignore
  isCCDV:boolean;

  aOrdID:any;

  yreport:any;
  // @ts-ignore
  isnullFB:boolean=false;
  constructor(private loginS:LoginService,private  orderS:OrderService,private feedbackS:FeedbackService,
              private rpS:ReportService) {

  }

  ngOnInit(): void {
    this.uT=this.loginS.getUserToken();
    this.id=this.uT.id
    this.isCCDV=this.loginS.containsRole('ROLE_CCDV',this.uT)
    this.getBA(0);
    this.getBP(0);

  }

  getBA(page:any){
    this.orderS.getByAppUser(page).subscribe((data)=>{
      this.yourOrders=data.content;
      this.pages=data;
      this.isF=data.first;
      this.isL=data.last;
      this.yourOrdersNull=this.yourOrders?.length==0
      this.showYOS();
    })
  }


  getBP(page:number){
    this.orderS.getByP(page).subscribe((data)=>{
      this.hiredOrders=data.content
      this.pages1=data;

      this.hiredOrdersNull=this.hiredOrders.length==0;
    })
  }


  showYOS(){

    $('#yo').css('font-weight','bold')
    $('#yro').css('font-weight','normal')
    $('#yro1').css('display','none')
    $('#yo1').css('display','block')
  }
  showYROS(){
    $('#yo').css('font-weight','normal')
    $('#yro').css('font-weight','bold')
    $('#yo1').css('display','none')
    $('#yro1').css('display','block')
  }



  replaceOrder(order:any,orders:any[]){
    let s =orders.length;
    for (let i = 0; i <s ; i++) {
        if (orders[i].id==order.id){
          orders[i]=order
          return;
        }
    }
  }

  getIdAorD(id:number){
      this.aOrdID=id;
  }
  acceptOrder(){
    let c=confirm("Are you sure?")
    // @ts-ignore
    let mess=document.getElementById("messA").value
    if (c){

      let o={
        id:this.aOrdID,
        messFromCCDV:mess,
      }
      this.orderS.acceptOrder(o).subscribe((data)=>{
        this.replaceOrder(data,this.hiredOrders)
      })
    }

  }
  declineOrder(){
    let c=confirm("Are you sure?")
    // @ts-ignore
    let mess=document.getElementById("messA").value
    if (c){
      let o={
        id:this.aOrdID,
        messFromCCDV:mess,
      }
      this.orderS.declineOrder(o).subscribe((data)=>{
        this.replaceOrder(data,this.hiredOrders)
      })
    }
  }
  cancelOrder(){
    let cf=confirm("Are you sure?")
    if (cf){
      this.orderS.cancelOrder(this.aOrdID).subscribe((data)=>{
        this.replaceOrder(data,this.yourOrders)
      })
    }
  }
  getPFB(feedback:any){
      if (feedback.from.id!=this.id){
        this.partnerFB=feedback;
      }else {
        this.myFB=feedback;
      }
  }
  orderDetail(id:any){
      this.aOrdID=id;
      this.orderS.findByID(id).subscribe((d)=>{
        this.hiredOrder=d;
        this.services=d.services.reverse();
      })
      this.feedbackS.findbyOrder(id).subscribe((d)=>{
        this.feedback=d;
        if (d.length!=0){
          for (let f of d){
            this.getPFB(f);
          }
        }else {
          this.myFB=undefined;
          this.partnerFB=undefined;
        }

      }
      )
    this.rpS.findByO(id).subscribe((d)=>{
      this.yreport=d;
      console.log(d)
    })
  }
  dFu(){
    let cf=confirm("Are you sure?")
    if (cf){
        this.orderS.doneFU(this.aOrdID).subscribe((d)=>{
          this.replaceOrder(d,this.yourOrders)
        })
    }
  }
  dFc(){
    let cf=confirm("Are you sure?")
    if (cf){
      this.orderS.doneFC(this.aOrdID).subscribe((d)=>{
        this.replaceOrder(d,this.hiredOrders)
      })
    }
  }
  createFB(){
    // @ts-ignore
    let v=document.getElementsByClassName("isgoodService")
    // @ts-ignore
    let isgoodS=v[0].checked;
    let abc;
      if (isgoodS){
        abc=1
      }else {
        abc=0
      }
    // @ts-ignore
    let fb=document.getElementById("fba")
    // @ts-ignore
    let ct=fb.value
    // @ts-ignore
     let feedback={
       order: {
         id:this.aOrdID
       },
       content:ct,
       isGoodFeedBack:abc,
     }
     this.feedbackS.createF(feedback).subscribe((d)=>
     {

         this.getPFB(d);
         alert("Feedback successfull")


     })
    // @ts-ignore
    fb.value=""


  }
  createRp(){
    // @ts-ignore
    let tit=document.getElementById("problemTit")
    let des=document.getElementById("problemDes")
    // @ts-ignore

    let problem1=tit.value;
    if (problem1==""){
      alert("Report failed!!!")
    }else {
     // @ts-ignore
      let desP=des.value;
      let rp={
        about: {
          id:this.aOrdID
        },
        problem:problem1,
        reason:desP

      }
      this.rpS.createRP(rp).subscribe((d)=>{
        this.yreport=d;
        alert("Report successfull!!!")
      })
    }
  }


}
