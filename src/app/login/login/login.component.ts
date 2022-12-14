import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {ProfileService} from "../../service/profile.service";
import {MessageService} from "../../service/message/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,private profileS:ProfileService,private messS:MessageService) { }

  ngOnInit(): void {
  }

  loginForm=new FormGroup({
    userName: new FormControl("",Validators.required),
    passWord: new FormControl("",Validators.required)
  })

  login(){
    this.loginService.login(this.loginForm.value).subscribe((data)=>{
      this.loginService.setUserToken(data)

      if (data==null){
        // @ts-ignore
        document.getElementById("checkLogin").style.display="flex";
      } else {
        if (data.userName != null){
          this.loginService.setToken(data.token);
          this.loginService.setUserToken(data);
          this.loginService.checkrole();
          this.profileS.getProfile(data.id).subscribe((d)=>{
            this.loginService.setProfile(d);
          })

          this.messS.getAllRoom().subscribe((d)=>{
            this.loginService.setroomsChat(d);
            this.loginService.getProfiles(this.loginService.getListIdUser(d))
            this.messS.connectTo(d);
          })

        } else {
            alert("tk da bi Ban")
        }
      }
    })
  }


}
