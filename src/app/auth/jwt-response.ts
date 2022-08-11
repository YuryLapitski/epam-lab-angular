export class JwtResponse {
  username: string;
  token: string;


  constructor(token: string, username: string) {
    this.token = token;
    this.username = username;
  }
}
