import {User} from "../../user/models/user";
import {Donator} from "../../donator/models/donator";
import {Campaign} from "../../campaigns/models/campaign";

export class Donation {

  constructor(
    public amount:number,
    public currency:string,
    public campaign?: Campaign,
    public benefactor?: Donator,
    public createdBy?: User,
    public createDate?: Date,
    public approved?: boolean,
    public approvedBy?: User,
    public approvedDate?: Date,
    public id?:number,
    public notes?: string,
  ) {
  }

}
