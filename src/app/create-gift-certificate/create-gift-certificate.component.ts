import { Component, OnInit } from '@angular/core';
import {GiftCertificateService} from "../service/gift-certificate.service";
import {GiftCertificateToCreate} from "../entity/giftCertificateToCreate";
import {TagToCreate} from "../entity/tagToCreate";
import {TokenStorageService} from "../auth/token-storage.service";
import {Observable, ReplaySubject} from "rxjs";

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
  role: string;
  image: string;

  constructor(private giftCertificateService: GiftCertificateService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.form = {};
    this.role = this.tokenService.getRole();
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

  onSubmit() {
    this.giftCertificate = new GiftCertificateToCreate(
      this.form.name,
      this.form.description,
      this.form.duration,
      this.form.price,
      this.image,
      this.tagList
    );

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
