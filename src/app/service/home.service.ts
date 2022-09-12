import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient, private  router: Router) { }

  newCCDV():Observable<any>{
    return this.http.get(`http://localhost:8080/profile/newccdv`)
  }
  vipCCDV():Observable<any>{
    return this.http.get(`http://localhost:8080/profile/vipccdv`)
  }
  near(page:number):Observable<any>{
    return this.http.get(`http://localhost:8080/profile/nearccdv?page=`+page)
  }
  getProfileByGender(page:number):Observable<any>{
    return this.http.get(`http://localhost:8080/profile/showbygender?page=`+page)
  }


}
