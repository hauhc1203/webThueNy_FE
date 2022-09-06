import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProvideServiceService {

  constructor(private http:HttpClient) { }

  getAllService():Observable<any>{
    return this.http.get<any>("http://localhost:8080/service")
  }
  getServiceByProfile(idProfile:number):Observable<any>{
    return this.http.get<any>("http://localhost:8080/service/"+idProfile)
  }
  registerService(data:any[]):Observable<any>{
    return this.http.post<any>("http://localhost:8080/service",data)
  }
}
