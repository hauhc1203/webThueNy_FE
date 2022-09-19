import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }
  createRP(rp:any):Observable<any>{
    // @ts-ignore
    return this.http.post<any>("http://localhost:8080/report",rp)
  }
  getallR(page:number):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/report?page="+page)
  }
  findByO(ido:number):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/report/"+ido)
  }
  reportNConfirm():Observable<any>{
    return this.http.get<any>("http://localhost:8080/report/reportNotConfirm")
  }
  reportConfirm():Observable<any>{
    return this.http.get<any>("http://localhost:8080/report/reportConfirm")
  }
  detailReport(id:any):Observable<any>{
    return this.http.get<any>("http://localhost:8080/report/detailReport/"+id)
  }

}
