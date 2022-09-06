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
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private registerService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  registerForm= new FormGroup({
    userName : new FormControl("",[Validators.required,Validators.minLength(5)]),
    passWord : new FormControl("",[Validators.required,Validators.minLength(5)]),
    email : new FormControl("", [Validators.required,Validators.pattern("^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$")]),
    phoneNumber : new FormControl ("",[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
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
      console.log(data)
      this.checkDuplicateUsername=data[0];
      this.checkDuplicateMail=data[1];
      if (data[0]&&data[1]){
        alert("Đăng ký tài khoản thành công")
        this.router.navigate(["login"])
      }

    });  }
}
