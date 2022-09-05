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
    userName: new FormControl("hauhc1203",Validators.required),
    passWord: new FormControl("abcd1234",Validators.required)
  })

  login(){
    this.loginService.login(this.loginForm.value).subscribe((data)=>{

      if (data==null){
        // @ts-ignore
        document.getElementById("checkLogin").style.display="flex";

      } else {
        this.loginService.setToken(data.token);
        localStorage.setItem('un',data.userName);
        localStorage.setItem('id',data.id)
        let roles=data.roles
        let size= roles.length;
        for (let i = 0; i < size; i++) {
            if (roles[i].name=='user'){
              this.router.navigate([""])
              break
            }else if (roles[i].name=='admin'){
              this.router.navigate(['admin'])
              break
            }
        }

        // @ts-ignore
        // document.getElementById("checkLogin").style.display="none";
      }
    })
  }
}
