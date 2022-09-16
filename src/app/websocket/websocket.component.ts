import { Component, OnInit } from '@angular/core';
import {Stomp} from "@stomp/stompjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  content: string ="";

  greetings: string[] = [];
  disabled = true;
  receiver: any;
  private stompClient : any;

  constructor() {
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/public/', function (hello:any) {
        _this.showGreeting(JSON.parse(hello.body).greetings);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    this.stompClient.send(
      '/gkz/chat.sendMessage',
      {},
      JSON.stringify({'receiver':this.receiver,'content':this.content})
    );
  }


  showGreeting(message:any) {

    this.greetings.push(message);
  }



  ngOnInit(): void {
  }

}

