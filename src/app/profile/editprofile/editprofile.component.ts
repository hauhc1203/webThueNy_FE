import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../service/profile.service";
import {UploadIMGService} from "../../service/upload-img.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from "jquery";
import {data} from "jquery";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {min} from "rxjs";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  // @ts-ignore
  id: number;
  // @ts-ignore
  profile:any;
  // @ts-ignore
  editForm: any = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl(),
    high: new FormControl(),
    weight: new FormControl(),
    hobby: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    introduction: new FormControl(),
    facebookLink: new FormControl(),
    gender: new FormControl(),
    birthDay: new FormControl(),
    requirementsForHirer: new FormControl(),
  });

  countrys: any;
  citys: any;


  // @ts-ignore
  constructor(private profileService: ProfileService, private uploadFile: UploadIMGService, private route: ActivatedRoute, private loginS:LoginService) {



      this.id= this.loginS.getUserToken().id;

      this.profileService.getCountry().subscribe((d) => {
        this.countrys = d;
      });
      this.profileService.getCity(1).subscribe((d) => {
        this.citys = d;
      });
      this.profileService.getProfile(this.id)?.subscribe((data) => {
        this.profile = data;

        // @ts-ignore
        this.editForm = new FormGroup({
          id: new FormControl(data?.id),
          fullName: new FormControl(data.fullName,[Validators.required,Validators.minLength(5)]),
          high: new FormControl(data.high,[Validators.min(150),Validators.max(250),Validators.required]),
          weight: new FormControl(data.weight,[Validators.min(30),Validators.max(200),Validators.required]),
          hobby: new FormControl(data.hobby,[Validators.required,Validators.minLength(10)]),
          country: new FormControl(data.country?.id,Validators.required),
          city: new FormControl(data.city?.id,Validators.required),
          introduction: new FormControl(data.introduction,[Validators.minLength(10),Validators.required]),
          facebookLink: new FormControl(data.facebookLink,[Validators.required,Validators.pattern('(?:(?:http|https):\\/\\/)?(?:www.|m.)?facebook.com\\/(?!home.php)(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[?\\w\\-]*\\/)?(?:profile.php\\?id=(?=\\d.*))?([\\w\\.-]+)')]),
          gender: new FormControl(data.gender,Validators.required),
          birthDay: new FormControl(data.birthDay,Validators.required),
        });
      });

  }

  ngOnInit(): void {

  }


  upfile(event: any, to: string) {
    this.choosefile(event, to)
    this.uploadFile.onFileSelected(event, to)
  }


  choosefile(filename: any, to: string) {
    let id = '#' + to;
    let id2 = 'input' + to;
    let link = document.getElementById(id2)
    let reader = new FileReader();
    reader.onload = function (e) {
      // @ts-ignore
      $(id).attr('src', e.target.result);
    }
// @ts-ignore
    reader.readAsDataURL(link.files[0])

  }
  isSendRQ:boolean=false;
  reqVerification(){
    this.profileService.reqVerification(this.id).subscribe((data)=>{
      alert("Send request verification successfull !")
      this.isSendRQ=true;
    })
  }
  editProfile() {
    let edit = {
      id: this.profile.id,
      country: {
        id: this.editForm.value.country,
        // name: this.profile.country.name
      },
      city: {
        id: this.editForm.value.city,

      },
      fullName: this.editForm.value.fullName,
      high: this.editForm.value.high,
      weight: this.editForm.value.weight,
      hobby: this.editForm.value.hobby,
      introduction: this.editForm.value.introduction,
      facebookLink: this.editForm.value.facebookLink,
      gender: this.editForm.value.gender,
      birthDay: this.editForm.value.birthDay,
    }

    // @ts-ignore
    this.profileService.updateProfile(edit).subscribe(()=>{
      alert("Chỉnh sửa thông tin thành công")
    });

  }



}
