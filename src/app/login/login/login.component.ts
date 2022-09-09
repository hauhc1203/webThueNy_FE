import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  loginForm=new FormGroup({
    userName: new FormControl("",Validators.required),
    passWord: new FormControl("",Validators.required)
  })

  login(){
    this.loginService.login(this.loginForm.value).subscribe((data)=>{
      // this.loginService.setToken(data.token);
      if (data==null){
        // @ts-ignore
        document.getElementById("checkLogin").style.display="flex";

      } else {
        if (data.userName != null){
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
