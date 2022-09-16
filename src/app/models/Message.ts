
import {AppUser} from "./AppUser";
import {RoomChat} from "./RoomChat";

export class Message {
  private _idMessage: number;
  private _sender : AppUser;
  private _receiver : AppUser;
  private _content : string;
  private _time : Date;
  private _roomchat: RoomChat;


  constructor(idMessage: number, sender: AppUser, receiver: AppUser, content: string, time: Date, roomchat: RoomChat) {
    this._idMessage = idMessage;
    this._sender = sender;
    this._receiver = receiver;
    this._content = content;
    this._time = time;
    this._roomchat = roomchat;
  }

  get idMessage(): number {
    return this._idMessage;
  }

  set idMessage(value: number) {
    this._idMessage = value;
  }

  get sender(): AppUser {
    return this._sender;
  }

  set sender(value: AppUser) {
    this._sender = value;
  }

  get receiver(): AppUser {
    return this._receiver;
  }

  set receiver(value: AppUser) {
    this._receiver = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get time(): Date {
    return this._time;
  }

  set time(value: Date) {
    this._time = value;
  }

  get roomchat(): RoomChat {
    return this._roomchat;
  }

  set roomchat(value: RoomChat) {
    this._roomchat = value;
  }
}
