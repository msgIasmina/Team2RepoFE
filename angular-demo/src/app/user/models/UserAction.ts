import {User} from "./User";

export interface UserAction {
  user: User;
  type: 'toggleActivation' | 'edit'; // Add more types if needed
}
