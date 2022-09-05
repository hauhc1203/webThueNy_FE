import { Component } from '@angular/core';
import {LoginService} from "./service/login.service";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "cloudsSorage";
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb;
  // @ts-ignore
  downloadURL: Observable<string>;
  token:string='';
  userName:string=''
  constructor(private loginService:LoginService,private storage: AngularFireStorage,private http:HttpClient)  {
    // // @ts-ignore
    // this.token=localStorage.getItem('token')
    // // @ts-ignore
    // this.userName=localStorage.getItem('un');
  }
  // @ts-ignore
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
          // @ts-ignore
          this.UpAvarta(url)
        }
      });
  }
  ngDoCheck(){
    // @ts-ignore
    this.token=localStorage.getItem('token')
    // @ts-ignore
    this.userName=localStorage.getItem('un');
  }
  logout(){
    this.loginService.logout();
  }
  UpAvarta(img:string){
    this.http.post(`http://localhost:8080/profiles/editAvarta`,img)

  }

}
