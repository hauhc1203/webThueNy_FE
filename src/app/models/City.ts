import {Country} from "./Country";

export class City{
  private _id:number;
  private _name:string;
  private _country:Country;


  constructor(id: number, name: string, country: Country) {
    this._id = id;
    this._name = name;
    this._country = country;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get country(): Country {
    return this._country;
  }

  set country(value: Country) {
    this._country = value;
  }
}
