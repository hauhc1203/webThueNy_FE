import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Profile} from "../models/Profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token: string = ''
  profile: any;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.token = localStorage.getItem('token')

  }


  findByid(id: number): Observable<any> {
    // @ts-ignore
    return this.http.get<any>("https://localhost:8080/profile/{id}" + id)
  }

  getProfile(id: number): Observable<any> {
    return this.http.get<any>("http://localhost:8080/profile/" + id)
  }

  getCity(id: number): Observable<any> {
    return this.http.get<any>("http://localhost:8080/city/" + id)
  }

  getCountry(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/country")
  }

  reqVerification(id: number) {
    return this.http.get<any>("http://localhost:8080/profile/reqVerification/" + id)
  }

  // @ts-ignore
  updateProfile(profile: any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>("http://localhost:8080/profile/edit/", profile)
  }

  getOrderByAppUser(id: any): Observable<any> {
    return this.http.get(`http://localhost:8080/profile/orderByUser/${id}`)
  }

  editPrice(profile: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/profile/editprice", profile)
  }

  editRQM(profile: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/profile/editrqm", profile)
  }

  showUserBoy(): Observable<Profile[]> {
    return this.http.get<Profile[]>("http://localhost:8080/profile/showUserBoy")

  }

  showUserGirl(): Observable<Profile[]> {
    return this.http.get<Profile[]>("http://localhost:8080/profile/showUserGirl")
  }
}
