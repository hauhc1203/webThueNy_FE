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



  getProfile(id:number):Observable<any>{
    return this.http.get<any>("http://localhost:8080/profile/"+id)
  }

}
