import {Role} from "./Role";

export class AppUser{
  private _id: number;
  private _userName : string;
  private _passWord : string;
  private _email : string;
  private _roles: Role[];
  private _status: any;
  private _isConfirm:boolean;


  constructor(id: number, userName: string, passWord: string, email: string, roles: Role[], status: any, isConfirm: boolean) {
    this._id = id;
    this._userName = userName;
    this._passWord = passWord;
    this._email = email;
    this._roles = roles;
    this._status = status;
    this._isConfirm = isConfirm;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get passWord(): string {
    return this._passWord;
  }

  set passWord(value: string) {
    this._passWord = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get roles(): Role[] {
    return this._roles;
  }

  set roles(value: Role[]) {
    this._roles = value;
  }

  get status(): any {
    return this._status;
  }

  set status(value: any) {
    this._status = value;
  }

  get isConfirm(): boolean {
    return this._isConfirm;
  }

  set isConfirm(value: boolean) {
    this._isConfirm = value;
  }
}
