import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {GiftCertificate} from "../entity/giftCertificate";
import {GiftCertificateService} from "../service/gift-certificate.service";
import { NgxSpinnerService } from 'ngx-spinner';

const FIRST_PAGE = 1;
const ZERO_LENGTH = 0;
const PAGE_SIZE = 8;
const INVALID_PAGE_NUMBER_ERROR_CODE = 40005;
const QUERY_SELECTOR_ARG = '#scrollArea';
const ROOT_MARGIN_VALUE = '0px'
const THRESHOLD_VALUE = 1;
const ENTRIES_INDEX = 0;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  giftCertificates: GiftCertificate[] = [];
  observer: any;
  currentPage = FIRST_PAGE;
  isLastPage: boolean = false;
  errorCode: number;
  image: string;

  @Output() scrolled = new EventEmitter<void>();

  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  constructor(private giftCertificateService: GiftCertificateService,
              private spinner: NgxSpinnerService) {  }

  ngOnInit(): void {
    this.getGiftCertificates();
    this.intersectionObserver();
  }

  ngAfterViewInit() {
    this.theLastList.changes.subscribe((d) => {
      if (d.last) {
        this.observer.observe(d.last.nativeElement);
      }
    });
  }

  getGiftCertificates() {
    this.spinner.show();
    this.giftCertificateService.getGiftCertificates(this.currentPage.toString(), PAGE_SIZE.toString())
      .subscribe(result => {
        if (this.giftCertificates.length === ZERO_LENGTH) {
          this.giftCertificates = result;
        } else {
          this.giftCertificates = this.giftCertificates.concat(result);
        }
        if (result.length < PAGE_SIZE) {
          this.isLastPage = true;
        }
      },
        error => {
          console.log(error);
          this.errorCode = error.error.errorCode
          if (this.errorCode === INVALID_PAGE_NUMBER_ERROR_CODE) {
            this.isLastPage = true;
          }
        });
  }

  intersectionObserver() {
    let options = {
      root: document.querySelector(QUERY_SELECTOR_ARG),
      rootMargin: ROOT_MARGIN_VALUE,
      threshold: THRESHOLD_VALUE,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[ENTRIES_INDEX].isIntersecting) {
        if (this.isLastPage === false) {
          this.currentPage++;
          this.getGiftCertificates();
        }
      }
    }, options);
  }
}
