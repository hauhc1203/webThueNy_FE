import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../service/profile.service";
import {UploadIMGService} from "../../service/upload-img.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from "jquery";
import {data} from "jquery";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  // @ts-ignore
  id: number;
  // @ts-ignore
  profile: any;
  // @ts-ignore
  createDate: string;
  editForm: any;

  countrys: any;
  citys: any;

  countryDropdown: number = 0;
  cityDropdown: number = 0;

  // @ts-ignore
  constructor(private profileService: ProfileService, private uploadFile: UploadIMGService, private route: ActivatedRoute,private router: Router) {

    profileService.getCountry().subscribe((d) => {
      this.countrys = d;

    });
    profileService.getCity(1).subscribe((d) => {
      this.citys = d;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = paramMap.get('id');
      this.profileService.getProfile(this.id).subscribe((data)=>{
        this.profile=data;
        console.log(data)
        // @ts-ignore
      this.editForm = new FormGroup({
          id: new FormControl,
          fullName: new FormControl(data.fullName),
          high: new FormControl(data.high),
          weight: new FormControl(data.weight),
          hobby: new FormControl(data.hobby),
          country: new FormControl(data.country),
          city: new FormControl(data.city),
          introduction: new FormControl(data.introduction),
          facebookLink: new FormControl(data.facebookLink),
          gender: new FormControl(data.gender),
          birthDay: new FormControl(data.birthDay),
        requirementsForHirer: new FormControl(data.requirementsForHirer),


        })

      });
    });
  }



  upfile(event: any, to: string) {
    this.choosefile(event, to)
    this.uploadFile.onFileSelected(event, to)
  }


  choosefile(filename: any, to: string) {
    let id = '#' + to;
    let id2 = 'input' + to;
    console.log(id2)
    let link = document.getElementById(id2)


    let reader = new FileReader();
    reader.onload = function (e) {
      // @ts-ignore
      $(id).attr('src', e.target.result);
    }
// @ts-ignore
    reader.readAsDataURL(link.files[0])

  }

  editProfile() {
    let edit = {
      id: this.editForm.value.id,
      country:{
        id: this.editForm.value.country
      },
      city:{
        id:this.editForm.value.city
      },
      fullName:this.editForm.value.fullName,
      high:this.editForm.value.high,
      weight:this.editForm.value.weight,
      hobby:this.editForm.value.hobby,
      introduction:this.editForm.value.introduction,
      facebookLink:this.editForm.value.facebookLink,
      gender:this.editForm.value.gender,
      birthDay:this.editForm.value.birthDay,
      requirementsForHirer:this.editForm.value.requirementsForHirer,

    }
    console.log(edit)
    // @ts-ignore
    this.profileService.updateProfile(edit).subscribe();
    // this.router.navigate(["/profile/show"])
  }

}
