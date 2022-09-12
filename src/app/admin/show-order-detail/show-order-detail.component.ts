import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../models/Order";

@Component({
  selector: 'app-show-order-detail',
  templateUrl: './show-order-detail.component.html',
  styleUrls: ['./show-order-detail.component.css']
})
export class ShowOrderDetailComponent implements OnInit {
  order !: Order ;
  orders:Order[]=[];
  p: any;

  constructor(private adminService:AdminService,private http:HttpClient,private route:ActivatedRoute,private  router:Router) { }

  ngOnInit(): void {
    this.adminService.showOrder().subscribe((dataOrder)=>{
      this.orders=dataOrder;
    })
  }

  showOrderDetail(id:any){
    this.adminService.showOrderDetail(id).subscribe((data)=>{
      this.order=data;
      console.log(data);
      console.log(id);
    })
  }

}