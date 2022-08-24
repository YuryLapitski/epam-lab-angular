import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../entity/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserByLogin(login: string): Observable<User> {
    return this.httpClient.get<User>(this.createFindUserByLoginUrl(login));
  }

  getAllUsers(page: string, size: string) {
    return this.httpClient.get<Array<User>>(this.createUrlWithPagination(page, size));
  }

  createFindUserByLoginUrl(login: string): string {
    return `http://localhost:8082/v1/users/login/?login=${login}`;
  }

  createUrlWithPagination(page: string, size: string): string {
    return `http://localhost:8082/v1/users/?page=${page}&size=${size}`;
  }
}
