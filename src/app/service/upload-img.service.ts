import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HttpClient} from "@angular/common/http";
import {finalize} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadIMGService {
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

  }
    // @ts-ignore
    onFileSelected(event,to:string){
      let n = Date.now();
      const file = event.target.files[0];
      const filePath = `RoomsImages/${n}`;
      // @ts-ignore
      const fileRef = this.storage.ref(filePath);
      // @ts-ignore
      const task = this.storage.upload(`RoomsImages/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            // @ts-ignore
            this.downloadURL = fileRef.getDownloadURL();
            // @ts-ignore
            this.downloadURL.subscribe(url => {
              if (url) {
                // @ts-ignore
                this.fb = url;
              }
              this.up(this.fb,to)
            });
          })
        )
        .subscribe((url:any) => {
          if (url) {

            // @ts-ignore
            // this.UpAvarta(url)
          }
        });
    }



  up(img:string,to:string){
    this.http.post(`http://localhost:8080/profile/`+to,img).subscribe(()=>{
      alert('upload anh thanh cong')
    })
  }

}
