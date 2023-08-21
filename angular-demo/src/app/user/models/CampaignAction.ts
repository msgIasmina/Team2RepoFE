import {Campaign} from "../../campaigns/models/campaign";

export interface CampaignAction{
  campaign:Campaign;
  type: 'delete'|'edit';
}
