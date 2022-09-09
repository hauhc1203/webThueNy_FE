import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../models/AppUser";
import {AdminService} from "../../service/admin.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {data} from "jquery";
import {Order} from "../../models/Order";
import {DatePipe} from "@angular/common";
import {Profile} from "../../models/Profile";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  appUsers : AppUser[] = [];
  date: Date =new Date();

  orders:Order[]=[];
  order !: Order ;
  constructor(private adminService:AdminService,private http:HttpClient,private route:ActivatedRoute,private  router:Router) { }

  message:string = "ban thanh cong";
  p: any;
  ngOnInit(): void {
    this.adminService.showUser().subscribe((data)=>{
      this.appUsers=data;
    });
    this.adminService.showOrder().subscribe((dataOrder)=>{
      this.orders=dataOrder;
    })
  }

  ban(id:any, i:any){
    this.appUsers[i].status =2;
    this.adminService.ban(id).subscribe(()=>{
      console.log(id)
    })
  }

  search(input: any) {
    this.adminService.showUser().subscribe((data) => {
      let adminSearch:AppUser[]=[]
      for (const a of data) {
        if (a.userName.toLowerCase().normalize('NFD') .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD') .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D'))){
          adminSearch.push(a)
        }
      }
      console.log(adminSearch)
      this.appUsers=adminSearch;
    })
  }

  offline(id:any, index:any){
    this.appUsers[index].status =0;
    this.adminService.offline(id).subscribe(()=>{
      console.log(id)
    })
  }

  vipp(id:any, indexxx:any){
    this.appUsers[indexxx].vip = true;
    this.adminService.vip(id).subscribe(()=>{
      console.log(id)
    })
  }


  unvip(id:any, indexx:any){
    this.appUsers[indexx].vip = false;
    this.adminService.unvip(id).subscribe(()=>{
      console.log(id)
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
