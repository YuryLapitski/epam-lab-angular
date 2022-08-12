import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthLoginInfo} from "./login-info";
import {Observable} from "rxjs";
import {JwtResponse} from "./jwt-response";
import {SignUpInfo} from "./signup-info";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8082/v1/auth/login';
  private signUpUrl = 'http://localhost:8082/v1/auth/signup';

  constructor(private http: HttpClient) { }

  attemptAuth(credential: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credential, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signUpUrl, info, httpOptions);
  }
}
