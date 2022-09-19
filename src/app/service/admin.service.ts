import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppUser} from "../models/AppUser";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  showUser():Observable<AppUser[]>{
    return this.http.get<AppUser[]>("http://localhost:8080/admin")
  }

  ban(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/admin/ban/${id}`);
  }

  offline(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/admin/offline/${id}`)
  }

  vip(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/admin/vip/${id}`)
  }

  unvip(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/admin/unvip/${id}`)
  }

  showOrder():Observable<any>{
    return this.http.get<any>(`http://localhost:8080/admin/showOrder`)
  }

  showOrderDetail(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/admin/showOder/${id}`)
  }

  userValidation(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/admin/uservalidation/${id}`)
  }

  refuse(id:number,mess:string):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/admin/refuse/${id}`,mess)
  }

  getProfile():Observable<any>{
    return this.http.get(`http://localhost:8080/admin/profile`)
  }
  orderBad():Observable<any>{
    return this.http.get(`http://localhost:8080/admin/orderbad`)
  }

  showOrderBad():Observable<any>{
    return this.http.get<any>(`http://localhost:8080/admin/showOderBad`)
  }


}
