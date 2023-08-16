export class User {
  constructor(
              public firstName: string,
              public lastName: string,
              public email: string,
              public mobileNumber: string,
              public rolesIDs: number[],
              public id?: number,
              public active?: boolean,
              public newUser?: boolean,
              public username?: string,
              public password?: string) {
  }
}
