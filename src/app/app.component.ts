import {Component, OnInit} from '@angular/core';
import {GiftCertificate} from "./entity/giftCertificate";
import {TokenStorageService} from "./auth/token-storage.service";
import {UserService} from "./service/user.service";
import {User} from "./entity/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GiftCertificateFrontend';
  info: any;
  user: User = new User();

  constructor(private tokenService: TokenStorageService, private userService: UserService) {

  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      role: this.tokenService.getRole(),
    };
    let login = this.info.username;
    if (login !== null) {
      this.userService.getUserByLogin(login).subscribe(result => this.user = result);
    }
    console.log('AppComponent Role: ' + this.info.role);
  }

  logout() {
    this.tokenService.logOut();
  }
}
