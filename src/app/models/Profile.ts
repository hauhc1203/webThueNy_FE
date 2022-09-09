import {City} from "./City";
import {Country} from "./Country";
import {Provide} from "./Provide";
import {AppUser} from "./AppUser";

export class Profile{
  private _id:number;
  private _fullName:string;
  private _birthDay:Date;
  private _city:City;
  private _country:Country;
  private _avatar: string;
  private _img1:string;
  private _img2:string;
  private _img3:string;
  private _high:number;
  private _weight:number;
  private _hobby:string;
  private _introduction:string;
  private _facebookLink:string;
  private _cost:number;
  private _gender:boolean;
  private _status:number;
  private _requirementsForHirer:string;
  private _createDate:Date;
  private _isConfirm:boolean;
  private _serviceList:Provide;
  private _appUser:AppUser;
  private _views:number;


  constructor(id: number, fullName: string, birthDay: Date, city: City, country: Country, avatar: string, img1: string, img2: string, img3: string, high: number, weight: number, hobby: string, introduction: string, facebookLink: string, cost: number, gender: boolean, status: number, requirementsForHirer: string, createDate: Date, isConfirm: boolean, serviceList: Provide, appUser: AppUser, views: number) {
    this._id = id;
    this._fullName = fullName;
    this._birthDay = birthDay;
    this._city = city;
    this._country = country;
    this._avatar = avatar;
    this._img1 = img1;
    this._img2 = img2;
    this._img3 = img3;
    this._high = high;
    this._weight = weight;
    this._hobby = hobby;
    this._introduction = introduction;
    this._facebookLink = facebookLink;
    this._cost = cost;
    this._gender = gender;
    this._status = status;
    this._requirementsForHirer = requirementsForHirer;
    this._createDate = createDate;
    this._isConfirm = isConfirm;
    this._serviceList = serviceList;
    this._appUser = appUser;
    this._views = views;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get birthDay(): Date {
    return this._birthDay;
  }

  set birthDay(value: Date) {
    this._birthDay = value;
  }

  get city(): City {
    return this._city;
  }

  set city(value: City) {
    this._city = value;
  }

  get country(): Country {
    return this._country;
  }

  set country(value: Country) {
    this._country = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get img1(): string {
    return this._img1;
  }

  set img1(value: string) {
    this._img1 = value;
  }

  get img2(): string {
    return this._img2;
  }

  set img2(value: string) {
    this._img2 = value;
  }

  get img3(): string {
    return this._img3;
  }

  set img3(value: string) {
    this._img3 = value;
  }

  get high(): number {
    return this._high;
  }

  set high(value: number) {
    this._high = value;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }

  get hobby(): string {
    return this._hobby;
  }

  set hobby(value: string) {
    this._hobby = value;
  }

  get introduction(): string {
    return this._introduction;
  }

  set introduction(value: string) {
    this._introduction = value;
  }

  get facebookLink(): string {
    return this._facebookLink;
  }

  set facebookLink(value: string) {
    this._facebookLink = value;
  }

  get cost(): number {
    return this._cost;
  }

  set cost(value: number) {
    this._cost = value;
  }

  get gender(): boolean {
    return this._gender;
  }

  set gender(value: boolean) {
    this._gender = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get requirementsForHirer(): string {
    return this._requirementsForHirer;
  }

  set requirementsForHirer(value: string) {
    this._requirementsForHirer = value;
  }

  get createDate(): Date {
    return this._createDate;
  }

  set createDate(value: Date) {
    this._createDate = value;
  }

  get isConfirm(): boolean {
    return this._isConfirm;
  }

  set isConfirm(value: boolean) {
    this._isConfirm = value;
  }

  get serviceList(): Provide {
    return this._serviceList;
  }

  set serviceList(value: Provide) {
    this._serviceList = value;
  }

  get appUser(): AppUser {
    return this._appUser;
  }

  set appUser(value: AppUser) {
    this._appUser = value;
  }

  get views(): number {
    return this._views;
  }

  set views(value: number) {
    this._views = value;
  }
}
