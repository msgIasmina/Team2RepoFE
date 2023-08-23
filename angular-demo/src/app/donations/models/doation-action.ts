import {Donation} from "./donation";

export class DonationAction{
  constructor(public type:string,public donation:Donation) {
  }
}
