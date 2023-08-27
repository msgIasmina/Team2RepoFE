import { Role } from './role';

export class UserPlaceholder {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public mobileNumber: string,
    public roles: Role[],
    public id?: number,
    public active?: boolean,
    public newUser?: boolean,
  ) {}
}
