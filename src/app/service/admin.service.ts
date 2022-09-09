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
    return this.http.get<any>(`http://localhost:8080/admin/showOder/${id}`,)
  }



}
