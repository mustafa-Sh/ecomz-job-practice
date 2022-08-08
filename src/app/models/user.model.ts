export class User {
  // user should not have password property, but just for mock data we added
  constructor(public id: string, public username: string, public email: string, public password: string, public token: string) {}
}
