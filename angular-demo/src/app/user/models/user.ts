import {Role} from "./role";

export class User {
  constructor(
    // public id: number,
    public firstName: string,
    public lastName: string,
    // public username: string,
    public email: string,
    public mobileNumber: string,
    // public password: string,
    public roles: Role[],
    // public campaigns: Campaign[]
  ) {
  }
}
