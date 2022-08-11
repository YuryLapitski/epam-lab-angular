import {Component, OnInit} from '@angular/core';
import {GiftCertificate} from "./entity/giftCertificate";
import {TokenStorageService} from "./auth/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GiftCertificateFrontend';
  tag!: GiftCertificate;
  info: any;

  constructor(private tokenService: TokenStorageService) {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      role: this.tokenService.getRole()
    };
    console.log('AppComponent Role: ' + this.info.role);
  }

  ngOnInit() {
    // if (this.tokenService.getToken()) {
    //   this.role = this.tokenService.getRole();
    //   console.log(this.role);
    // }
  }

  logout() {
    this.tokenService.logOut();
  }

}
