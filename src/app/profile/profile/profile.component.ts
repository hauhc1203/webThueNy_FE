import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../service/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:number=0;
  constructor(private profileService:ProfileService) {

    // @ts-ignore
    this.id=localStorage.getItem('id');
    profileService.getProfile(this.id).subscribe((data)=>{
      console.log(data)
    });
  }

  ngOnInit(): void {
  }


}
