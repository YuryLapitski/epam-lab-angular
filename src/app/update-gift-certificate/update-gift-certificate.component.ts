import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {GiftCertificateService} from "../service/gift-certificate.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {GiftCertificate} from "../entity/giftCertificate";
import {GiftCertificateToCreate} from "../entity/giftCertificateToCreate";
import {TagToCreate} from "../entity/tagToCreate";
import {Observable, ReplaySubject} from "rxjs";

@Component({
  selector: 'app-update-gift-certificate',
  templateUrl: './update-gift-certificate.component.html',
  styleUrls: ['./update-gift-certificate.component.css']
})
export class UpdateGiftCertificateComponent implements OnInit {
  giftCertificateId: string;
  giftCertificate: GiftCertificate;
  role: string;
  form: any = {};
  giftCertificateToCreate: GiftCertificateToCreate;
  isUpdated: boolean;
  isUpdateFailed: boolean;
  errorMessage: string;
  tagList: TagToCreate[] = [];
  tagName: string;
  image: string;

  private routeSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private giftCertificateService: GiftCertificateService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => this.giftCertificateId = params['giftCertificateId']);
    this.giftCertificateService.getGiftCertificate(this.giftCertificateId).subscribe(result => {
        this.giftCertificate = result;
        this.tagList = this.giftCertificate.tagList.map(tag => new TagToCreate(tag.name));
      });
    this.role = this.tokenService.getRole();
  }

  onSubmit() {
    this.giftCertificateToCreate = new GiftCertificateToCreate(
      this.form.name,
      this.form.description,
      this.form.duration,
      this.form.price,
      this.image,
      this.tagList);

    this.giftCertificateService.updateGiftCertificate(this.giftCertificateId, this.giftCertificateToCreate).subscribe(
      () => {
        this.isUpdated = true;
        this.isUpdateFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.errorMessage;
        this.isUpdateFailed = true;
      }
    );
  }

  onFileSelected(event) {
    console.log(event);
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.image = 'data:image/jpeg;base64,' + base64;
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  addTag(): TagToCreate {
    this.tagList = this.giftCertificate.tagList;
    let tagToCreate: TagToCreate = new TagToCreate(this.tagName);
    this.tagList.push(tagToCreate);
    console.log(tagToCreate.name);
    return tagToCreate;
  }

  deleteTag(tagName: string) {
    this.tagList.forEach((item, index) => {
      if (item.name === tagName) {
        this.tagList.splice(index);
      }
    });
  }
}
