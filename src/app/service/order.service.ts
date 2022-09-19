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
  findByID(id:number):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/order/find/"+id)
  }
  getByAppUser(page:number):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/order/getbyu?page="+page)
  }
  getByP(page:number):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/order/getbyp?page="+page)
  }

  acceptOrder(o:any):Observable<any>{
    // @ts-ignore
    return this.http.post<any>("http://localhost:8080/order/accept",o)
  }

  doneFU(id:any):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/order/dfu/"+id)
  }
  doneFC(id:any):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/order/dfc/"+id)
  }
  declineOrder(o:any):Observable<any>{
    // @ts-ignore
    return this.http.post<any>("http://localhost:8080/order/decline",o)
  }
  cancelOrder(id:number):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/order/cancel/"+id)
  }
  // orderDetail(idUser:any, idOrder:any):Observable<any>{
  //   return this.http.get<any>("http://localhost:8080/order/orderDetail/"+idUser+"/"+idOrder)
  // }


}
