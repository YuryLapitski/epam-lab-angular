import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {GiftCertificateService} from "../service/gift-certificate.service";
import {GiftCertificate} from "../entity/giftCertificate";
import {LocationStrategy} from "@angular/common";

const FIRST_PAGE = '1';
const MAX_SIZE = '100';
const TAG_NAME_PARAM_NAME = 'tagName';

@Component({
  selector: 'app-gift-certificates-by-tag',
  templateUrl: './gift-certificates-by-tag.component.html',
  styleUrls: ['./gift-certificates-by-tag.component.css']
})
export class GiftCertificatesByTagComponent implements OnInit {
  tagName: string;
  giftCertificates: GiftCertificate[] = [];
  page: string = FIRST_PAGE;
  size: string = MAX_SIZE;

  private querySubscription: Subscription

  constructor(private route: ActivatedRoute,
              private giftCertificateService: GiftCertificateService,
              private router: Router,
              private location: LocationStrategy) {
    location.onPopState(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.subscribe(queryParam => this.tagName = queryParam[TAG_NAME_PARAM_NAME]);
    this.giftCertificateService.getGiftCertificatesByTag(this.tagName, this.page, this.size)
      .subscribe(result => this.giftCertificates = result);
  }

  reloadPage(tagName: string) {
    this.router.navigateByUrl(`gift-certificates-by-tag?tagName=${tagName}`).then(() => window.location.reload());
  }
}
