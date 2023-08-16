import {Role} from "./role";

export class UserPlaceholder{
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public mobileNumber: string,
    public roles: Role[]){
  }
}
