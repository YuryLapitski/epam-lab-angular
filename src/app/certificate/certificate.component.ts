import {Component, OnInit} from '@angular/core';
import {GiftCertificateService} from "../service/gift-certificate.service";
import {GiftCertificate} from "../entity/giftCertificate";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CartService} from "../service/cart.service";
import {TokenStorageService} from "../auth/token-storage.service";

const DEFAULT_IMAGE_URL = 'assets/images/noImage.jpg';
const EMPTY_STRING = ''

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  giftCertificate: GiftCertificate = new GiftCertificate();
  giftCertificateId: string = EMPTY_STRING;
  imgUrl: string = DEFAULT_IMAGE_URL;
  role: string = EMPTY_STRING;
  errorMessage: string;
  isDelete: boolean;
  isDeleteFailed: boolean;

  private routeSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private giftCertificateService: GiftCertificateService,
              private cartService: CartService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => this.giftCertificateId = params['giftCertificateId']);
    this.giftCertificateService.getGiftCertificate(this.giftCertificateId)
        .subscribe(result => this.giftCertificate = result);
    this.role = this.tokenService.getRole();
    console.log(this.role);
  }

  addToCart(giftCertificate: GiftCertificate) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(giftCertificate);
  }

  deleteGiftCertificate(giftCertificate: GiftCertificate) {
    this.giftCertificateService.deleteGiftCertificate(giftCertificate.id.toString()).subscribe(
      () => {
        this.isDelete = true;
        console.log('The gift certificate has been deleted');
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.errorMessage;
        this.isDelete = false;
        this.isDeleteFailed = true;
      }
    );
  }
}
