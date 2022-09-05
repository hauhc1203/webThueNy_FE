import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../models/AppUser";
import {AdminService} from "../../service/admin.service";
import {data, param} from "jquery";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  appUsers : AppUser[] = []
  constructor(private adminService:AdminService,private http:HttpClient,private route:ActivatedRoute,private  router:Router) { }

  message:string = "ban thanh cong";
  ngOnInit(): void {
    this.adminService.showUser().subscribe((data)=>{
      this.appUsers=data;
    })

  }

  ban(id:any){
    this.adminService.ban(id).subscribe(()=>{
        this.ngOnInit();
    })
  }








}
