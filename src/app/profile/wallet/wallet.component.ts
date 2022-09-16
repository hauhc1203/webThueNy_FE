import { Component, OnInit } from '@angular/core';
import {WalletService} from "../../service/wallet.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallet:any;
  depositAmount:any;
  // @ts-ignore
  id:number;
  constructor(private walletService:WalletService, private  router: Router,private loginS:LoginService) { }

  ngOnInit(): void {

    this.id=this.loginS.getUserToken().id;
    this.walletService.getWallet().subscribe((data)=>{
      this.wallet=data
    })

  }
  recharge(){
    // @ts-ignore
    let numberMoney =document.getElementById("pwd").value;

    let waletUser = {
      id:this.wallet.id,
      numberMoney: numberMoney
    }

    // @ts-ignore

    this.walletService.recharge(waletUser).subscribe((data)=>{
        this.wallet=data
    })

  }


}
