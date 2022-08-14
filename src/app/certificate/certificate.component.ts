import {Component, Input, OnInit} from '@angular/core';
import {GiftCertificateService} from "../service/gift-certificate.service";
import {GiftCertificate} from "../entity/giftCertificate";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CartService} from "../service/cart.service";
import {TokenStorageService} from "../auth/token-storage.service";

const DEFAULT_IMAGE_URL = 'assets/images/noImage.jpg';
const EMPTY_STRING = ''

@Component({
  selector: 'home-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  giftCertificate: GiftCertificate = new GiftCertificate();
  giftCertificateId: string = EMPTY_STRING;
  imgUrl: string = DEFAULT_IMAGE_URL;
  role: string = EMPTY_STRING;

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
}