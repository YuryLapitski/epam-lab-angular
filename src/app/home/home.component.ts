import { Component, OnInit } from '@angular/core';
import {GiftCertificate} from "../entity/giftCertificate";
import {GiftCertificateService} from "../service/gift-certificate.service";
import {ImageService} from "../service/image.service";
import {ImageRelation} from "../entity/imageRelation";

const FIRST_PAGE = '1';
const MAX_SIZE = '100';
const DEFAULT_IMAGE_URL = 'assets/images/noImage.jpg';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  giftCertificates: GiftCertificate[] = [];
  page: string = FIRST_PAGE;
  size: string = MAX_SIZE;
  imgRelations: ImageRelation[] = [];

  constructor(private giftCertificateService: GiftCertificateService, private imageService: ImageService) {  }

  ngOnInit(): void {
    this.giftCertificateService.getGiftCertificates(this.page, this.size)
      .subscribe(result => this.giftCertificates = result);
    this.imageService.getImage().subscribe(result => this.imgRelations = result)
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
