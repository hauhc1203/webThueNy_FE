import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  loginForm=new FormGroup({
    userName: new FormControl("",Validators.required),
    passWord: new FormControl("",Validators.required)
  })

  login(){
    this.loginService.login(this.loginForm.value).subscribe((data)=>{
      console.log(data)
      // this.loginService.setToken(data.token);
      if (data==null){
        console.log("đăng nhập sai")
        // @ts-ignore
        document.getElementById("checkLogin").style.display="flex";

      } else {
        if (data.userName != null){
          console.log(data)
          this.loginService.setToken(data.token);
          this.loginService.setUserToken(data);
          this.loginService.checkrole();
          // @ts-ignore
          document.getElementById("checkLogin").style.display="none";
        } else {
            alert("tk da bi Ban")
        }
      }
    })
  }
}
