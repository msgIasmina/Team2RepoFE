import {Campaign} from "./campaign";

export class CampaignFilterPair{
  constructor(public campaigns: Campaign[],
              public totalItems: number) {
  }
}
