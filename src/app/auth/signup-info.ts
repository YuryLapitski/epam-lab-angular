export class SignupInfo {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  role: string;

  constructor(firstName: string, lastName: string, login: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this. password = password;
    this.role = 'USER';
  }
}
