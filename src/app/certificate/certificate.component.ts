import {Component, OnInit} from '@angular/core';
import {GiftCertificateService} from "../service/gift-certificate.service";
import {GiftCertificate} from "../entity/giftCertificate";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CartService} from "../service/cart.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {ImageService} from "../service/image.service";
import {ImageRelation} from "../entity/imageRelation";

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
  role: string = EMPTY_STRING;
  errorMessage: string;
  isDelete: boolean;
  isDeleteFailed: boolean;
  imgRelations: ImageRelation[] = [];

  private routeSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private giftCertificateService: GiftCertificateService,
              private cartService: CartService,
              private tokenService: TokenStorageService,
              private imageService: ImageService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => this.giftCertificateId = params['giftCertificateId']);
    this.giftCertificateService.getGiftCertificate(this.giftCertificateId)
        .subscribe(result => this.giftCertificate = result);
    this.role = this.tokenService.getRole();
    this.imageService.getImage().subscribe(result => this.imgRelations = result);
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

  getImageUrl(name: string): string {
    let imgUrl = '';
    this.imgRelations.map(function(imageRelation) {
      if (imageRelation.gcName === name) {
        imgUrl = imageRelation.path;
      }
    });
    if (imgUrl === '') {
      imgUrl = DEFAULT_IMAGE_URL;
    }
    return imgUrl;
  }
}
