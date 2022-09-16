import { Component, OnInit } from '@angular/core';
import {WalletService} from "../../service/wallet.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallet:any;
  depositAmount:any;

  constructor(private walletService:WalletService, private  router: Router) { }

  ngOnInit(): void {
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
      console.log(data)
        this.wallet=data
    })

  }


}
