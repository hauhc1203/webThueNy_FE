import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stomp} from "@stomp/stompjs";
import {ProfileService} from "../profile.service";
import {LoginService} from "../login.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  isClosingWindowChat:boolean=true;

  private stompClient: any;
  // @ts-ignore
  uT:any;
  // @ts-ignore
  friendChatS:any[]
  // @ts-ignore
  listRoomChat:any[]
  profile:any
  constructor(private http:HttpClient,private profileS:ProfileService,private  loginS:LoginService) {
      this.uT=loginS.getUserToken();
      this.friendChatS=loginS.getfriendsChat();
      this.profile=loginS.getProfile()
      this.listRoomChat=loginS.getroomsChat();
  }
  createNewConnet(room:string){
    let dess='/private/'+room
    const  _this=this;
    this.stompClient.subscribe(dess, function (mess: any) {
      _this.showPM(JSON.parse(mess.body),room);
    });
  }
  connectTo(listRoom:any){
    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);
    let un=this.loginS.getUserToken()?.userName;
    console.log(un)
    // đường dẫn đến server
    const _this = this;
    this.stompClient.connect({}, function () {

      for (let r of listRoom){
        let destination='/private/'+r.room
        _this.stompClient.subscribe(destination, function (mess: any) {
          _this.showPM(JSON.parse(mess.body),r.room);
        });
      }
      let des2='/notification/'+un;
      _this.stompClient.subscribe(des2, function (notifi: any) {
        _this.createNewConect2(JSON.parse(notifi.body));
      });

    });
  }
  createNewConect2(data:any){
    this.createNewConnet(data?.room);
    this.getAllRoom().subscribe((d)=>{
      this.loginS.setroomsChat(d);
      this.loginS.getProfiles(this.loginS.getListIdUser(d))
      this.loginS.setroomsChat(d);
    })

  }

  sendRq(notifi:any) {
    this.stompClient.send(
      '/gkz/newrqchat',
      {},
      // Dữ liệu được gửi đi
      JSON.stringify(notifi)
    );
  }

  chatrieng(mess:any) {
    this.stompClient.send(
      '/gkz/private',
      {},
      // Dữ liệu được gửi đi
      JSON.stringify(mess)
    );
  }
  createNewWindowChat(room:string,profileRec:any){
    let room1=this.getRoomR(room)
    let receiver=this.getPReciver(room1);
    let dom=document.getElementById(room)
    if (dom==null){
      $('#chat-frame').append(
        `<div class="chat-frame-item" id="${room}" >
        <div class="chat-frame-item-header">
        <div class="user-info">
            <div class="user-avatar">
              <img class="avatar" src="${profileRec?.avatar}" alt="">
            </div>
            <div class="user-name">
              <h1 class="user-name-item">${profileRec?.fullName}</h1>
              <p class="user-status">Đang hoạt động</p>
            </div>
        </div>
        <div class="chuc-nang">

            <ion-icon name="remove-outline" >
            </ion-icon>

            <ion-icon id="close${room}"  name="close"></ion-icon>


        </div>
    </div>
    <div class="chat-frame-item-body" id="body${room}">
    </div>
    <div class="chat-frame-item-bottom">
        <div class="input-chat">
          <input id="input${room}" class="input-chat-item" placeholder="Type your message">
        </div>
        <div class="button-send" id="send${room}">
            <ion-icon name="send"></ion-icon>
        </div>
    </div>
  </div>`)

      let cid='#close'+room
      let sid='#send'+room

      const _this=this;
      $(document).on('click',cid,room,function() {
        _this.closeChat(room)
      })
      $(document).on('click',sid,room,function() {
        _this.sendMess(room)
      })

      let idBody='#body'+room
      let room12={
        person1:{
          id:this.loginS.getUserToken()?.id
        },
        person2:{
          id:receiver?.appUser?.id
        },
        room:room
      }
      this.getMessByRoom(room12).subscribe((d)=>{
        // @ts-ignore
        let listM:any[]=d;
        for (let m of listM){
          if (m.sender.id!=this.loginS.getUserToken()?.id){
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
                                    <img class="avatar" src="${this.profile?.avatar}" alt="">
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
      let id='#'+room
      $(id).css('display','block')
    }

  }
  showPM(m:any,r:string){
    let dom=document.getElementById(r)
    if (dom!=null){
      let id='#'+r
      // @ts-ignore
      $(id).css('display','block')
      let bodyId='#body'+r;
      let idSender=m?.sender?.id;
      console.log(idSender)
      console.log(this.loginS.getUserToken().id)
      if (idSender!=this.loginS.getUserToken().id){
        this.profileS.getProfile(idSender).subscribe((d)=>{
          $(bodyId).append(`<div class="sender-div">
        <div class="sender-avatar">
          <img class="avatar" src="${d?.avatar}" alt="">
        </div>
        <div class="content-mess-sender">
          <p>${m?.content}</p>
        </div>
      </div>
        `)
        })
      }
    }
    else {
      let idRecv;
      if(this.loginS.getUserToken()?.id==m.sender.id){
        idRecv=m.receiver.id;
      }else {
        idRecv=m.sender.id;
      }
      // @ts-ignore
      let profileRecv:any;
      for (let p of this.loginS.getfriendsChat()){
        if(idRecv==p.appUser.id){
          profileRecv=p;
          break
        }
      }
      $('#chat-frame').append(
        `<div class="chat-frame-item" id="${r}" >
        <div class="chat-frame-item-header">
        <div class="user-info">
            <div class="user-avatar">
              <img class="avatar" src="${profileRecv?.avatar}" alt="">
            </div>
            <div class="user-name">
              <h1 class="user-name-item">${profileRecv?.fullName}</h1>
              <p class="user-status">Đang hoạt động</p>
            </div>
        </div>
        <div class="chuc-nang">

            <ion-icon name="remove-outline" >
            </ion-icon>

            <ion-icon id="close${r}"  name="close"></ion-icon>


        </div>
    </div>
    <div class="chat-frame-item-body" id="body${r}">
    </div>
    <div class="chat-frame-item-bottom">
        <div class="input-chat">
          <input id="input${r}" class="input-chat-item" placeholder="Type your message">
        </div>
        <div class="button-send" id="send${r}">
            <ion-icon name="send"></ion-icon>
        </div>
    </div>
  </div>`)

      let cid='#close'+r
      let sid='#send'+r
      const _this=this;
      $(document).on('click',cid,r,function() {
        _this.closeChat(r)
      })
      $(document).on('click',sid,r,function() {
        _this.sendMess(r)
      })
      let idBody='#body'+r
      let room={
          person1:{
            id:this.loginS.getUserToken()?.id
          },
          person2:{
            id:idRecv
          },
          room:r
      }
      this.getMessByRoom(room).subscribe((d)=>{
        // @ts-ignore
        let listM:any[]=d;
        for (let m of listM){
          if (m.sender.id!=this.loginS.getUserToken()?.id){
            $(idBody).append(`
                    <div class="sender-div" >
                        <div class="sender-avatar">
                             <img class="avatar" src="${profileRecv?.avatar}" alt="">
                        </div>
                     <div class="content-mess-sender">
                          <p>${m?.content}</p>
                     </div>
                    </div>`)
          }else {
            $(idBody).append(`<div class="receiver-div">
                                <div class="receiver-avatar">
                                    <img class="avatar" src="${this.profile?.avatar}" alt="">
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
  }
  closeChat(dom:any){
    let id='#'+dom
    $(id).css('display','none')
  }
  getRoomR(roomname:string){
    for (let r of this.loginS.getroomsChat()){
      if (r.room==roomname){
        return r;
      }
    }
  }
  sendMess(room:string){

    let idInput='input'+room
    let mess=document.getElementById(idInput)
    let room1= this.getRoomR(room)
    let recv=this.getPReciver(room1)

    // @ts-ignore

    let messa=mess.value
    if (messa!=""){
      let message={
        sender:{
          id:this.loginS?.getUserToken()?.id
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
      this.chatrieng(message)
    }


  }


  getPReciver(room:any){
    let profile;
    if(room?.person1.id==this.loginS.getUserToken()?.id){
      for (let p of  this.loginS.getfriendsChat()){
        if (room?.person2.id==p.appUser.id){
          profile=p;
          break
        }
      }
    }else {
      for (let p of this.loginS.getfriendsChat()){
        if (room?.person1.id==p.appUser.id){
          profile= p
          ;
          break
        }
      }
    }

    return profile;
  }

  createRoom(room:any):Observable<any>{
    // @ts-ignore
    return this.http.post<any>("http://localhost:8080/roomchat",room)
  }
  getR(ps2:any):Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/roomchat/"+ps2)
  }
  getAllRoom():Observable<any>{
    // @ts-ignore
    return this.http.get<any>("http://localhost:8080/roomchat/getallroom")
  }

  getMessByRoom(room:any){
    return this.http.post("http://localhost:8080/getMbyR",room)
  }
}
