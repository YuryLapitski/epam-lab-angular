import { Component, OnInit } from '@angular/core';
import {GiftCertificateService} from "../service/gift-certificate.service";
import {GiftCertificateToCreate} from "../entity/giftCertificateToCreate";
import {TagToCreate} from "../entity/tagToCreate";

@Component({
  selector: 'app-create-gift-certificate',
  templateUrl: './create-gift-certificate.component.html',
  styleUrls: ['./create-gift-certificate.component.css']
})
export class CreateGiftCertificateComponent implements OnInit {
  form: any;
  giftCertificate: GiftCertificateToCreate;
  tagList: TagToCreate[] = [];
  isCreated: boolean;
  isCreateFailed: boolean;
  errorMessage: string;
  tagName: string;

  constructor(private giftCertificateService: GiftCertificateService) {
  }

  ngOnInit(): void {
    this.form = {};
  }

  onSubmit() {
    this.giftCertificate = new GiftCertificateToCreate(
      this.form.name,
      this.form.description,
      this.form.duration,
      this.form.price,
      this.tagList);

    this.giftCertificateService.createGiftCertificate(this.giftCertificate).subscribe(
      () => {
        this.isCreated = true;
        this.isCreateFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.errorMessage;
        this.isCreateFailed = true;
      }
    );
  }

  addTag(): TagToCreate {
    let tagToCreate: TagToCreate = new TagToCreate(this.tagName);
    this.tagList.push(tagToCreate);
    console.log(tagToCreate.name);
    return tagToCreate;
  }
}
