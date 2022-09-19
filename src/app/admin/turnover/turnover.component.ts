import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./turnover.component.css']
})
export class TurnoverComponent implements OnInit {
  totalBydate:any
  total:any


  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.totalOrder().subscribe((data)=>{
      this.total=data
    })
  }

  dateForm:any = new FormGroup({
    month:new FormControl("",[Validators.required,Validators.min(1),Validators.max(12)]),
    year:new FormControl("",[Validators.required,Validators.min(2020),Validators.max(2050)])
  })

  findByDate(){
    let date={
      month:this.dateForm.value.month,
      year:this.dateForm.value.year
    }
    this.adminService.findTotalBtDate(date).subscribe((data)=>{
      this.totalBydate=data
      console.log(data)
    })
  }





}
