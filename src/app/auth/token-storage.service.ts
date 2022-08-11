import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

const TOKEN_KEY = 'Token';
const USERNAME_KEY = 'Username';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  role!: string;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() {
  }

  logOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public getRole(): string {
    this.role = '';
    let token = this.getToken();
    if (token) {
      let userInfoJSON = this.jwtHelper.decodeToken(token);
      for (let prop in userInfoJSON) {
        if (prop === 'Role') {
          this.role = userInfoJSON[prop];
        }
      }
    } else {
      this.role = 'UNAUTHORIZED'
    }
    return this.role;
  }
}
