import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OrderPost} from "../entity/orderPost";
import {Observable} from "rxjs";
import {Order} from "../entity/order";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const createOrderUrl = 'http://localhost:8082/v1/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  createOrder(info: OrderPost): Observable<string> {
    return this.httpClient.post<string>(createOrderUrl, info);
  }

  getOrdersByUserId(userId: string, page: string, size: string) {
    return this.httpClient.get<Array<Order>>(this.createUrlGetOrdersByUserId(userId, page, size));
  }

  getOrders(page: string, size: string) {
    return this.httpClient.get<Array<Order>>(this.createUrlGetOrders(page, size));
  }

  createUrlGetOrdersByUserId(userId: string, page: string, size: string) {
    return `http://localhost:8082/v1/users/${userId}/orders/?page=${page}&size=${size}`;
  }

  createUrlGetOrders(page: string, size: string) {
    return `http://localhost:8082/v1/orders/?page=${page}&size=${size}`
  }
}
