import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../service/profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  // private String fullName;
  //
  // private java.sql.Date birthDay;
  //
  // @ManyToOne
  // private City city ;
  // @ManyToOne
  // private Country country;
  //
  // private String avatar;
  //
  // private String img1;
  //
  // private String img2;
  //
  // private String img3;
  //
  // private float high;
  //
  // private float weight;
  //
  // private String hobby;
  //
  // private String introduction;
  //
  // private String facebookLink;
  //
  // private double  cost;
  //
  // private int status;
  // private String requirementsForHirer;
  // private Date createDate;
  // private boolean fullFill;
  // @ManyToMany(fetch = FetchType.EAGER )
  // private Set<Service> serviceList;
  // @OneToOne
  // private AppUser appUser;
  profileForm=new FormGroup({
    userName: new FormControl("hauhc1203",Validators.required),
    passWord: new FormControl("abcd1234",Validators.required)
  })


  ngOnInit(): void {
  }


}
