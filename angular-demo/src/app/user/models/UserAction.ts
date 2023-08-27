import { User } from './user';

export interface UserAction {
  user: User;
  type: 'toggleActivation' | 'edit'; // Add more types if needed
}
