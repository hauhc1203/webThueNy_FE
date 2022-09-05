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
    return this.http.get<AppUser[]>("http://localhost:8080/user")
  }
}
