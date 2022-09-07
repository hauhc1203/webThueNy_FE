import {Component, DoCheck, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {

  token:string='';
  constructor(private loginService:LoginService) {

  }


  ngDoCheck(){
    // @ts-ignore
    this.token=this.loginService.getToke()
  }

  ngOnInit(): void {
  }



}
