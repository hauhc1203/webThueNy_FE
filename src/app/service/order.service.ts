import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private  http:HttpClient) { }
  createOrder(order:any,sv:any):Observable<any>{
    // @ts-ignore
    return this.http.post<any>("http://localhost:8080/order/"+sv,order)
  }
  showBadOrder():Observable<any>{
    return this.http.get<any>("http://localhost:8080/order/showBadOrder")
  }
}
