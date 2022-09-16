import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../models/AppUser";
import {AdminService} from "../../service/admin.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {data} from "jquery";
import {Order} from "../../models/Order";
import {DatePipe} from "@angular/common";
import {Profile} from "../../models/Profile";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  appUsers : AppUser[] = [];
  date: Date =new Date();
  profiles : Profile[]=[];
  createDate : any;
  profile !:Profile;
  order1 !: Order[];
  // @ts-ignore
  idR:number;
  // @ts-ignore
  mess:string;


  order !: Order ;
  constructor(private adminService:AdminService,private http:HttpClient,private route:ActivatedRoute,private  router:Router,private orderService:OrderService) { }

  message:string = "ban thanh cong";
  p: any;
  ngOnInit(): void {
    this.adminService.showUser().subscribe((data)=>{
      this.appUsers=data;
    })
    this.adminService.getProfile().subscribe((data)=>{
      this.profiles=data;
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
    })
  }


  unvip(id:any, indexx:any){
    this.appUsers[indexx].vip = false;
    this.adminService.unvip(id).subscribe(()=>{
      console.log(id)
    })
  }

  userValidation(id:any){

    this.adminService.userValidation(id).subscribe(()=>{
      this.adminService.getProfile().subscribe((data)=>{
        console.log(data)
        this.profiles=data;

      })
    })
  }
  getID(id:number){
    this.idR=id;
  }
  refuse(){
    // @ts-ignore
    this.mess=document.getElementById("mess").value
    console.log(this.mess)
    this.adminService.refuse(this.idR,this.mess).subscribe(()=>{

      this.adminService.getProfile().subscribe((data)=>{
        this.profiles=data;
      })
      // @ts-ignore
      document.getElementById("mess").value = "";
    })
  }


















}
