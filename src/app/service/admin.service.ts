import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  showUser(admin:any):Observable<any>{
    return this.http.get<any>("http://localhost:8080/user",admin)
  }
}
