import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token:string =''
  constructor(private http:HttpClient) {
    // @ts-ignore
    this.token=localStorage.getItem('token')

  }


  findByid(id:number):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("https://localhost:8080/profile/{id}"+id)
  }

  getProfile(id:number):Observable<any>{
    return this.http.get<any>("http://localhost:8080/profile/"+id)
  }
  getCity(id:number):Observable<any>{
    return this.http.get<any>("http://localhost:8080/city/"+id)
  }
  getCountry():Observable<any>{
    return this.http.get<any>("http://localhost:8080/country")
  }

  reqVerification(id:number){
      return this.http.get<any>("http://localhost:8080/profile/reqVerification/"+id)
  }
  // @ts-ignore
  updateProfile(profile:any):Observable<any>{
    // @ts-ignore
    return this.http.post<any>("http://localhost:8080/profile/edit/",profile)
  }
}
