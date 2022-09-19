import { Component } from '@angular/core';
import {LoginService} from "./service/login.service";
import {ProfileService} from "./service/profile.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {MessageService} from "./service/message/message.service";
import {Profile} from "./models/Profile";
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
// import {fab} from  '@fortawesome/free-brands-svg-icons'
// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ProjectA';
  token:any;
  ut:any;
  userName:string=''
  // @ts-ignore
  idAppuser:number;
  profile:any;
  listRoomChat:any[]=[];
  friendsChat:Profile[]=[];
  isAdmin:boolean=false;

  constructor(private loginService:LoginService,private  profileS:ProfileService,private messageS:MessageService)  {
    // @ts-ignore
    this.profileS.getProfile(this.loginService.getUserToken()?.id).subscribe((d)=>{
      this.loginService.setProfile(d);
    })

    this.messageS.connectTo(this.loginService.getroomsChat())
    // let thisismyredirect = true;
    //   window.onbeforeunload=function(ev:any) {
    //    if (!thisismyredirect){
    //      loginService.logout();
    //    }
    //   }
  }
  ngOnInit(){

  }
  ngDoCheck(){
    this.isAdmin=this.loginService.containsRole('ROLE_ADMIN',this.loginService.getUserToken())

    let userToken=this.loginService.getUserToken();
    this.ut=userToken;
    this.token=userToken?.token;
    this.idAppuser=userToken?.id;
    this.userName=userToken?.userName;
    this.friendsChat=this.loginService.getfriendsChat();
    this.profile=this.loginService.getProfile();
    this.listRoomChat=this.loginService.getroomsChat();

  }
  logout(){
    $('div.chat-frame-item').remove()
    this.loginService.logout();
  }



  isOpenListChat:boolean=false;
  openListChat(){
    if (this.isOpenListChat){
      $('#list-chat').css('display','none')
      this.isOpenListChat=false;
    }else {
      $('#list-chat').css('display','block')
      this.isOpenListChat=true
    }
  }
  getPReciver(room:any){
    let profile;
    if(room?.person1.id==this.ut.id){
      for (let p of  this.friendsChat){
        if (room?.person2.id==p.appUser.id){
          profile=p;
          break
        }
      }
    }else {
      for (let p of  this.friendsChat){
        if (room?.person1.id==p.appUser.id){
          profile= p
          ;
          break
        }
      }
    }
    return profile;
  }
  openWindowchat(id:any){
    let room=this.getRoom(this.loginService.getUserToken()?.id,id,this.loginService.getroomsChat())
    let receiver=this.getPReciver(room);
    let dom=document.getElementById(room?.room)
    if (dom==null){
      $('#chat-frame').append(
        `<div class="chat-frame-item" id="${room.room}" >
        <div class="chat-frame-item-header">
        <div class="user-info">
            <div class="user-avatar">
              <img class="avatar" src="${receiver?.avatar}" alt="">
            </div>
            <div class="user-name">
              <h1 class="user-name-item">${receiver?.fullName}</h1>
              <p class="user-status">Đang hoạt động</p>
            </div>
        </div>
        <div class="chuc-nang">

            <ion-icon name="remove-outline" >
            </ion-icon>

            <ion-icon id="close${room?.room}"  name="close"></ion-icon>


        </div>
    </div>
    <div class="chat-frame-item-body" id="body${room?.room}">
    </div>
    <div class="chat-frame-item-bottom">
        <div class="input-chat">
          <input id="input${room?.room}" class="input-chat-item" placeholder="Type your message">
        </div>
        <div class="button-send" id="send${room.room}">
            <ion-icon name="send"></ion-icon>
        </div>
    </div>
  </div>`)

      let cid='#close'+room?.room
      let sid='#send'+room?.room

      const _this=this;
      $(document).on('click',cid,room?.room,function() {
        _this.closeChat(room?.room)
      })
      $(document).on('click',sid,room?.room,function() {
        _this.sendMess(room?.room)
      })
      let idBody='#body'+room?.room
      this.messageS.getMessByRoom(room).subscribe((d)=>{
        // @ts-ignore
        let listM:any[]=d;
        console.log(d)
        for (let m of listM){
          if (m.sender.id!=this.ut.id){
            $(idBody).append(`
                    <div class="sender-div" >
                        <div class="sender-avatar">
                             <img class="avatar" src="${receiver?.avatar}" alt="">
                        </div>
                     <div class="content-mess-sender">
                          <p>${m?.content}</p>
                     </div>
                    </div>`)
          }else {
            $(idBody).append(`<div class="receiver-div">
                                <div class="receiver-avatar">
                                    <img class="avatar" src="${this.profile.avatar}" alt="">
                                </div>
                                <div class="content-mess-receiver">
                                            <p>${m?.content}</p>
                                    </div>
                         </div>
`)
          }
        }
      })


    }
    else {
      let id='#'+room?.room
        $(id).css('display','block')
    }



  }
  getRoom(id1:number,id2:number,listR:any[]){
    for (let r of listR ){
      if ((id1==r?.person1?.id&&id2==r?.person2?.id)||(id2==r?.person1?.id&&id1==r?.person2?.id)){
        return r;
      }
    }
  }
  closeChat(dom:any){
    let id='#'+dom
    $(id).css('display','none')
  }
  sendMess(room:any){
    let idInput='input'+room
    let mess=document.getElementById(idInput)
    // @ts-ignore

    let messa=mess.value
    if (messa!=""){
      let room1= this.getRoomR(room)
      let recv=this.getPReciver(room1)
      let message={
        sender:{
          id:this.idAppuser
        },
        receiver:recv?.appUser,
        content:messa,
        room:room
      }
      let idbody='#body'+room
      // @ts-ignore
      mess.value=""
      $(idbody).append(`<div class="receiver-div">
        <div class="receiver-avatar">
          <img class="avatar" src="${this.profile.avatar}" alt="">
        </div>
        <div class="content-mess-receiver">
          <p>${messa}</p>
        </div>
      </div>`)
      // @ts-ignore
      this.messageS.chatrieng(message)
    }


  }


  getRoomR(roomname:string){
    for (let r of this.listRoomChat){
      if (r.room==roomname){
        return r;
      }
    }
  }
}
