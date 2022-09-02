import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  checkDuplicateMail:boolean = false;
  checkDuplicateUsername:boolean = false;

  constructor(private registerService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  registerForm= new FormGroup({
    userName : new FormControl("",Validators.required),
    passWord : new FormControl("",Validators.required),
    email : new FormControl ("",Validators.required),
    sdt : new FormControl ("",Validators.required)
  })

  checkMail(){

    this.registerService.findByEmail(this.registerForm.value.email).subscribe( (data)=>{
      if (data!=null){
        this.checkDuplicateMail=true;
        console.log("trùng mail")
        // @ts-ignore
        document.getElementById("checkMail").style.display="flex";
      }
      else {
        this.checkDuplicateMail=false;
        // @ts-ignore
        document.getElementById("checkMail").style.display="none";
        if (!this.checkDuplicateUsername){
          this.registerService.register(this.registerForm.value).subscribe(() => {
            console.log("đăng kí thành công");
            this.router.navigate(["/login"])
          })
        }
      }


    });
  }

  checkUserName(){
    this.registerService.findByUser(this.registerForm.value.userName).subscribe(   (data:any)=>{
      if(data!=null) {
        this.checkDuplicateUsername=true;
        console.log("trùng username")
        // @ts-ignore
        document.getElementById("checkUserName").style.display = "flex";
      }
      else {
        this.checkDuplicateUsername=false;
        // @ts-ignore
        document.getElementById("checkUserName").style.display = "none";
      }
      this.checkMail();

    });
  }
  register(){
    this.checkUserName();
  }
}
