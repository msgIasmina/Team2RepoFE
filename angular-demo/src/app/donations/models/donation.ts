import {User} from "../../user/models/user";

export class Donation {

  constructor(
    public amount:number,
    public currency:string,
    public createdBy: User,
    public id?:number,
  ) {
  }

}
