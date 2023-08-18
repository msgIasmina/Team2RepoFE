import {Donator} from "./donator";


export interface DonatorAction {
  donator: Donator;
  type: 'delete' | 'edit'; // Add more types if needed
}
