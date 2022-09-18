import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../models/Order";
import {Report} from "../../models/Report";

@Component({
  selector: 'app-show-order-detail',
  templateUrl: './show-order-detail.component.html',
  styleUrls: ['./show-order-detail.component.css']
})
export class ShowOrderDetailComponent implements OnInit {
  order !: Order ;
  orders:Order[]=[];
  p: any;
  orderBad:Order[]=[];
  report :Report[]=[];

  constructor(private adminService:AdminService,private http:HttpClient,private route:ActivatedRoute,private  router:Router) { }

  ngOnInit(): void {
    this.adminService.showOrder().subscribe((dataOrder)=>{
      this.orders=dataOrder;
    })
    this.adminService.orderBad().subscribe((data)=>{
      this.orderBad=data
    })
  }

  showOrderDetail(id:any){
    this.adminService.showOrderDetail(id).subscribe((data)=>{
      console.log(data)
      this.order=data;

    })
  }

  showReportSingle(id:any){
    this.adminService.rpByOrder(id).subscribe((dataRp)=>{
      if (dataRp.length==1){
        console.log(dataRp)
        this.report=dataRp;
      }

    })
  }

}
