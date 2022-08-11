import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GiftCertificate} from "../entity/giftCertificate";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GiftCertificateService {

  constructor(private http: HttpClient) { }

  getGiftCertificates(page: string, size: string): Observable<Array<GiftCertificate>> {
    return this.http.get<Array<GiftCertificate>>(this.createUrlWithPagination(page, size));
  }

  getGiftCertificate(id: string): Observable<GiftCertificate> {
    return this.http.get<GiftCertificate>(this.createGiftCertificateURL(id));
  }

  createUrlWithPagination(page: string, size: string): string {
    return `http://localhost:8082/v1/gift-certificates/?page=${page}&size=${size}`;
  }

  createGiftCertificateURL(id: string): string {
    return `http://localhost:8082/v1/gift-certificates/${id}`;
  }
}
