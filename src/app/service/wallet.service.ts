import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http:HttpClient) { }

  getWallet():Observable<any>{
    return this.http.get<any>("http://localhost:8080/wallet")
  }
}
