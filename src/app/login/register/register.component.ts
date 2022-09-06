import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  checkDuplicateMail:boolean = true;
  checkDuplicateUsername:boolean = true;

  constructor(private registerService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  registerForm= new FormGroup({
    userName : new FormControl("",[Validators.required,Validators.minLength(10)]),
    passWord : new FormControl("",Validators.required),
    email : new FormControl ("",Validators.required),
    phoneNumber : new FormControl ("",Validators.required)
  })

  // checkMail(){
  //   this.registerService.findByEmail(this.registerForm.value.email).subscribe( (data)=>{
  //     if (data!=null){
  //       this.checkDuplicateMail=true;
  //     }
  //     else {
  //       this.checkDuplicateMail=false;
  //       if (!this.checkDuplicateUsername){
  //
  //       }
  //     }
  //   });
  // }
  //
  // checkUserName(){
  //   this.registerService.findByUser(this.registerForm.value.userName).subscribe(  (data:any)=>{
  //     if(data!=null) {
  //       this.checkDuplicateUsername=true;
  //     }
  //     else {
  //       this.checkDuplicateUsername=false;
  //     }
  //     this.checkMail();
  //   });
  // }
  register(){
    this.registerService.register(this.registerForm.value).subscribe((data)=>{
      this.checkDuplicateUsername=data[0];
      this.checkDuplicateMail=data[1];
      if (data[0]&&data[1]){
        alert("Đăng ký tài khoản thành công")
        this.router.navigate(["login"])
      }

    });  }
}
