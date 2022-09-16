import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient) { }
  createF(f:any):Observable<any>{
    // @ts-ignore
    return this.http.post<any>("http://localhost:8080/feedback",f)
  }

  findbyOrder(id:any):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/feedback/"+id);
  }
}
