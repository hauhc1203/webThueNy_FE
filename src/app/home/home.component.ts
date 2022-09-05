import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token:string='';
  constructor() {

  }

  ngOnInit(): void {
  }
  ngDoCheck(){
    // @ts-ignore
    this.token=localStorage.getItem('token')
    // @ts-ignore
    this.userName=localStorage.getItem('un');
  }



}
