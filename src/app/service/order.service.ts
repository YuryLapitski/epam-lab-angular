import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OrderPost} from "../entity/orderPost";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const orderUrl = 'http://localhost:8082/v1/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  createOrder(info: OrderPost): Observable<string> {
    return this.httpClient.post<string>(orderUrl, info);
  }
}
