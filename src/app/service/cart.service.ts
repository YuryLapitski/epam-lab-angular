import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GiftCertificate} from "../entity/giftCertificate";

const GIFT_CERTIFICATE_ID_KEY = 'Gift-certificate-id';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  giftCertificatesId: bigint[] = [];

  constructor(private http: HttpClient) { }

  clearCart() {
    window.sessionStorage.removeItem(GIFT_CERTIFICATE_ID_KEY);
  }

  public saveGiftCertificateId(giftCertificate: GiftCertificate) {
    this.giftCertificatesId = JSON.parse(this.getGiftCertificateId());
    if (this.giftCertificatesId === null) {
      this.giftCertificatesId = [];
    }
    this.giftCertificatesId.push(giftCertificate.id)
    let jsonArray = JSON.stringify(this.giftCertificatesId);
    window.sessionStorage.removeItem(GIFT_CERTIFICATE_ID_KEY);
    window.sessionStorage.setItem(GIFT_CERTIFICATE_ID_KEY, jsonArray);
  }

  public getGiftCertificateId(): string | null {
    return sessionStorage.getItem(GIFT_CERTIFICATE_ID_KEY);
  }
}
