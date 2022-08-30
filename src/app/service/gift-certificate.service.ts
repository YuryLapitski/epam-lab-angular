import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GiftCertificate} from "../entity/giftCertificate";
import {Observable} from "rxjs";
import {GiftCertificateToCreate} from "../entity/giftCertificateToCreate";

const CREATE_GIFT_CERTIFICATE_URL = 'http://localhost:8082/v1/gift-certificates';
const DELETE_GIFT_CERTIFICATE_URL = 'http://localhost:8082/v1/gift-certificates';

@Injectable({
  providedIn: 'root'
})
export class GiftCertificateService {

  constructor(private httpClient: HttpClient) { }

  getGiftCertificates(page: string, size: string): Observable<Array<GiftCertificate>> {
    return this.httpClient.get<Array<GiftCertificate>>(this.createUrlWithPagination(page, size));
  }

  getGiftCertificate(id: string): Observable<GiftCertificate> {
    return this.httpClient.get<GiftCertificate>(this.createGiftCertificateURL(id));
  }

  getGiftCertificatesByTag(tagName: string, page: string, size: string): Observable<Array<GiftCertificate>> {
    return this.httpClient.get<Array<GiftCertificate>>(this.createGiftCertificatesByTagUrl(tagName, page, size));
  }

  createUrlWithPagination(page: string, size: string): string {
    return `http://localhost:8082/v1/gift-certificates/?page=${page}&size=${size}`;
  }

  createGiftCertificateURL(id: string): string {
    return `http://localhost:8082/v1/gift-certificates/${id}`;
  }

  createGiftCertificatesByTagUrl(tagName: string, page: string, size: string): string {
    return `http://localhost:8082/v1/gift-certificates/?tagName=${tagName}&page=${page}&size=${size}`;
  }

  createGiftCertificate(info: GiftCertificateToCreate): Observable<string> {
    return this.httpClient.post<string>(CREATE_GIFT_CERTIFICATE_URL, info);
  }

  deleteGiftCertificate(id: string) {
    return this.httpClient.delete(this.createGiftCertificateURL(id));
  }

  updateGiftCertificate(id: string, info: GiftCertificateToCreate) {
    return this.httpClient.put(this.createGiftCertificateURL(id), info);
  }
}
