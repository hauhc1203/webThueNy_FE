import {Role} from "./Role";
import {Profile} from "./Profile";
import {AppUser} from "./AppUser";

export class Order{
  private _id: number;
  private _time: number;
  private _startTime:number;
  private _address:string;
  private _datingTime:Date;
  private _profile:Profile;
  private _appUser:AppUser;
  private _doneFromUser:boolean;
  private _messFromUser:string;
  private _doneFromCCDV:boolean;
  private _messFromCCDV:string;
  private _total:number;
  private _status:number;


  constructor(id: number, time: number, startTime: number, address: string, datingTime: Date, profile: Profile, appUser: AppUser, doneFromUser: boolean, messFromUser: string, doneFromCCDV: boolean, messFromCCDV: string, total: number, status: number) {
    this._id = id;
    this._time = time;
    this._startTime = startTime;
    this._address = address;
    this._datingTime = datingTime;
    this._profile = profile;
    this._appUser = appUser;
    this._doneFromUser = doneFromUser;
    this._messFromUser = messFromUser;
    this._doneFromCCDV = doneFromCCDV;
    this._messFromCCDV = messFromCCDV;
    this._total = total;
    this._status = status;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get time(): number {
    return this._time;
  }

  set time(value: number) {
    this._time = value;
  }

  get startTime(): number {
    return this._startTime;
  }

  set startTime(value: number) {
    this._startTime = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get datingTime(): Date {
    return this._datingTime;
  }

  set datingTime(value: Date) {
    this._datingTime = value;
  }

  get profile(): Profile {
    return this._profile;
  }

  set profile(value: Profile) {
    this._profile = value;
  }

  get appUser(): AppUser {
    return this._appUser;
  }

  set appUser(value: AppUser) {
    this._appUser = value;
  }

  get doneFromUser(): boolean {
    return this._doneFromUser;
  }

  set doneFromUser(value: boolean) {
    this._doneFromUser = value;
  }

  get messFromUser(): string {
    return this._messFromUser;
  }

  set messFromUser(value: string) {
    this._messFromUser = value;
  }

  get doneFromCCDV(): boolean {
    return this._doneFromCCDV;
  }

  set doneFromCCDV(value: boolean) {
    this._doneFromCCDV = value;
  }

  get messFromCCDV(): string {
    return this._messFromCCDV;
  }

  set messFromCCDV(value: string) {
    this._messFromCCDV = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }
}
