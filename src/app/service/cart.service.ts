import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GiftCertificate} from "../entity/giftCertificate";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  giftCertificates: GiftCertificate[] = [];

  constructor(private http: HttpClient) { }

  addToCart(giftCertificate: GiftCertificate) {
    this.giftCertificates.push(giftCertificate);
  }

  getGiftCertificates(): GiftCertificate[] {
    return this.giftCertificates;
  }

  clearCart() {
    this.giftCertificates = [];
    return this.giftCertificates;
  }
}
