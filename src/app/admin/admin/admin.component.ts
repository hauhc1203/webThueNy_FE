import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../models/AppUser";
import {AdminService} from "../../service/admin.service";
import {data} from "jquery";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  appUsers : AppUser[] = []
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.showUser().subscribe((data)=>{
      this.appUsers=data;
    })
  }

}
