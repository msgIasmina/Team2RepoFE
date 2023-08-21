import {Donation} from "./donation";

export interface DonationAction {
  donation: Donation;
  type: 'delete' | 'edit' | 'approve'; // Add more types if needed
}
