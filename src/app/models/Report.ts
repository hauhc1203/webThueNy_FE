import {AppUser} from "./AppUser";
import {Order} from "./Order";

export class Report{

  private _id:number;
  private _from:AppUser;
  private _about:Order;
  private _problem:string;
  private _reason:string;
  private _isConfirm:boolean;


  constructor(id: number, from: AppUser, about: Order, problem: string, reason: string, isConfirm: boolean) {
    this._id = id;
    this._from = from;
    this._about = about;
    this._problem = problem;
    this._reason = reason;
    this._isConfirm = isConfirm;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get from(): AppUser {
    return this._from;
  }

  set from(value: AppUser) {
    this._from = value;
  }

  get about(): Order {
    return this._about;
  }

  set about(value: Order) {
    this._about = value;
  }

  get problem(): string {
    return this._problem;
  }

  set problem(value: string) {
    this._problem = value;
  }

  get reason(): string {
    return this._reason;
  }

  set reason(value: string) {
    this._reason = value;
  }

  get isConfirm(): boolean {
    return this._isConfirm;
  }

  set isConfirm(value: boolean) {
    this._isConfirm = value;
  }
}
