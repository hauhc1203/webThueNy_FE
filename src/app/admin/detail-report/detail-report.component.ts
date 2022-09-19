import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../service/report.service";
import {Order} from "../../models/Order";
import {OrderService} from "../../service/order.service";
import {identity} from "rxjs";
import {AdminService} from "../../service/admin.service";
import {Report} from "../../models/Report";
import {data} from "jquery";

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {
  detailOrder!: Order;
  detailReport!: Report;


  constructor(private reportService: ReportService, private orderService: OrderService, private adminService: AdminService) {
  }

  ngOnInit(): void {

    this.adminService.showOrderBad().subscribe((data) => {
      this.detailOrder = data;
      console.log(data)
    })

    // this.reportService.detailReport(this.detailOrder.id).subscribe((data)=>{
    //   this.detailReport= data;
    //   console.log("data")
    //   console.log("data")
    //   console.log(data)
    // })
  }

  showOrderDetail(id:any) {
    console.log(id)
    this.reportService.detailReport(id).subscribe((data)=>{
      this.detailReport= data;
    console.log("data")
    console.log("data")
    console.log(data)
    })
  }
}
