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
  checkDuplicateMail:boolean = false;
  checkDuplicateUsername:boolean = false;

  constructor(private registerService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  registerForm= new FormGroup({
    userName : new FormControl("hauhc1203",Validators.required),
    passWord : new FormControl("abcd1234",Validators.required),
    email : new FormControl ("hau.hc1203@gmail.com",Validators.required),
    phoneNumber : new FormControl ("0345066663",Validators.required)
  })

  checkMail(){
    this.registerService.findByEmail(this.registerForm.value.email).subscribe( (data)=>{
      if (data!=null){
        this.checkDuplicateMail=true;
      }
      else {
        this.checkDuplicateMail=false;
        if (!this.checkDuplicateUsername){
          this.registerService.register(this.registerForm.value).subscribe(()=>{
            alert("Đăng ký tài khoản thành công")
            this.router.navigate(["login"])
          });
        }
      }
    });
  }

  checkUserName(){
    this.registerService.findByUser(this.registerForm.value.userName).subscribe(  (data:any)=>{
      if(data!=null) {
        this.checkDuplicateUsername=true;
      }
      else {
        this.checkDuplicateUsername=false;
      }
      this.checkMail();

    });
  }
  register(){
    this.checkUserName();
  }
}
