import { Donation } from './donation';

export interface DonationAction {
  donation: Donation;
  type: 'edit' | 'delete' | 'approve';
}
