import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GiftCertificate} from "../entity/giftCertificate";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: GiftCertificate[] = [];

  constructor(private http: HttpClient) { }

  addToCart(giftCertificate: GiftCertificate) {
    this.items.push(giftCertificate);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
