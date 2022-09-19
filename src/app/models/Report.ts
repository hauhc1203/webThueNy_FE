import {Order} from "./Order";
import {AppUser} from "./AppUser";
export class Report{
  private _about:Order;
  private _from:AppUser;
  private _problem:string;
  private _reason:string;
  private _isConfirm:boolean = false;


  constructor(about: Order, from: AppUser, problem: string, reason: string, isConfirm: boolean) {
    this._about = about;
    this._from = from;
    this._problem = problem;
    this._reason = reason;
    this._isConfirm = isConfirm;
  }

  get about(): Order {
    return this._about;
  }

  set about(value: Order) {
    this._about = value;
  }

  get from(): AppUser {
    return this._from;
  }

  set from(value: AppUser) {
    this._from = value;
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
