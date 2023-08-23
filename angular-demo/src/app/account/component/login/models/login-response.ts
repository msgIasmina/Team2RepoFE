export class LoginResponse{
  constructor(
    public token:string,
    public type:string,
    public permissions:string[],
    public newUser:boolean,
    public disabled:boolean,
    public id?:number,
    public username?:string,
    public email?:string
  ) {}
}
