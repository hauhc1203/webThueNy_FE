import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserToken} from "../models/UserToken";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private  router: Router) { }

  login(user:any):Observable<any>{
    return this.http.post<any>("http://localhost:8080/login",user)
  }

  register(user:any):Observable<any>{
    return this.http.post<any>("http://localhost:8080/register",user)
  }

  setToken(token: string){
    localStorage.setItem("token",token)
  }

  findByUser(name:any):Observable<any>{
    return this.http.get(`http://localhost:8080/findByName/${name}`)
  }

  findByEmail(email:any):Observable<any>{
    return this.http.get(`http://localhost:8080/findByEmail/${email}`)
  }
  getToke(){
    localStorage.getItem("token");
  }

  setUserToken(userToken: UserToken){
    localStorage.setItem("userToken",JSON.stringify(userToken));
  }

  getUserToken(): UserToken{
    return JSON.parse(<string>localStorage.getItem("userToken"));
  }

  checkrole(){
    let usertoken = this.getUserToken();
    for (const role of usertoken?.roles) {
      if (role.name == 'ROLE_ADMIN'){
        this.router.navigate(["/admin"])
      }if (role.name == '') {
        this.router.navigate(["/pageEror"])
      }
    }
  }
}
