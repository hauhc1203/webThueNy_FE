import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../service/profile.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:number=0;
  editForm: any;
  constructor(private profileService:ProfileService) {

    // @ts-ignore
    this.id=localStorage.getItem('id');
    profileService.getProfile(this.id).subscribe((data)=>{
      console.log(data)
    });
  }

  // @ts-ignore
  ngOnInit(): void {
    // @ts-ignore
   this.editForm = new FormGroup({
      fullname : new FormControl
    })
  }


}
