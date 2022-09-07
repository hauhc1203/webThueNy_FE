import {Role} from "./Role";


export class UserToken{
  id: number;
  userName: string;
  token:string;
  roles: Role[];


  constructor(id: number, name: string, token: string, roles: Role[]) {
    this.id = id;
    this.userName = name;
    this.token = token;
    this.roles = roles;
  }
}
