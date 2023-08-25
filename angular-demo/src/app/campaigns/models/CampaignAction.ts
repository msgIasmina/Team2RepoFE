import {Campaign} from "./campaign";

export interface CampaignAction{
  campaign:Campaign;
  type: 'delete'|'edit';
}
