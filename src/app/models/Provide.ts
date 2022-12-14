export class Provide {
  private _id:number;
  private _name:string;
  private _category:string;


  constructor(id: number, name: string, category: string) {
    this._id = id;
    this._name = name;
    this._category = category;
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

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }
}
