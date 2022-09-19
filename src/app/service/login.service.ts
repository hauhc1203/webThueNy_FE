import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserToken} from "../models/UserToken";
import {Router} from "@angular/router";
import {ProfileService} from "./profile.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  friendsChat:any;
  roomsChat:any;
  profile:any;
  constructor(private http:HttpClient, private  router: Router,private profileS:ProfileService) { }

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
  getToke():string{
    // @ts-ignore
    return localStorage.getItem("token");
  }

  setUserToken(userToken: UserToken){
    localStorage.setItem("userToken",JSON.stringify(userToken));
  }

  getUserToken(): UserToken{
    return JSON.parse(<string>localStorage.getItem("userToken"));
  }

  checkrole(){
    let usertoken = this.getUserToken();
    if (this.containsRole("ROLE_ADMIN",usertoken)){
      this.router.navigate(["/admin"])
    }else  {
      this.router.navigate([""])
    }

  }
  logout(){
    localStorage.clear();
    this.router.navigate(["/login"])
  }
  containsRole(role:string,userToken:any):boolean{
    let size=userToken.roles.length
    for (let i = 0; i <size ; i++) {
        if (role==userToken.roles[i]?.name){
          return true;
        }
    }
    return false;

  }
  setfriendsChat(list:any){
    localStorage.setItem("friendschat",JSON.stringify(list));
  }
  setroomsChat(list:any){
    localStorage.setItem("roomschat",JSON.stringify(list));
  }
  setProfile(p:any){
    localStorage.setItem("profile",JSON.stringify(p));
  }
  getfriendsChat(): any{
    return JSON.parse(<string>localStorage.getItem("friendschat"));
  }

  getroomsChat(): any{
    return JSON.parse(<string>localStorage.getItem("roomschat"));
  }
  getProfile(): any{
    return JSON.parse(<string>localStorage.getItem("profile"));
  }


  getListIdUser(listA:any){
    let listU =new Array();
    let idU=this.getUserToken().id;
    for (let a of listA){
      if (idU!=a.person1.id){
        listU.push(a.person1.id)
      }else {
        listU.push(a.person2.id)
      }
    }
    return listU;
  }
  getProfiles(listU:any){
    this.profileS.getListP(listU).subscribe((data)=>{
      this.setfriendsChat(data);
    })

  }
}
