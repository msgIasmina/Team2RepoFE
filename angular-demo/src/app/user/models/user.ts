export class User {
  constructor(public id: number,
              public firstName: string,
              public lastName: string,
              public active: boolean,
              public newUser: boolean,
              public username: string,
              public mobileNumer: string,
              public email: string,
              public password: string) {
  }
}
