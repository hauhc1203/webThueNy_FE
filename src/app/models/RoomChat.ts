import {AppUser} from "./AppUser";

export class RoomChat{
private _idRoom:number;
private _sender:AppUser;
private _receiver:AppUser;

  constructor(idRoom: number, sender: AppUser, receiver: AppUser) {
    this._idRoom = idRoom;
    this._sender = sender;
    this._receiver = receiver;
  }

  get idRoom(): number {
    return this._idRoom;
  }

  set idRoom(value: number) {
    this._idRoom = value;
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
}
