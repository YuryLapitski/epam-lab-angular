import { Component, OnInit } from '@angular/core';
import {CartService} from "../service/cart.service";
import {GiftCertificate} from "../entity/giftCertificate";
import {OrderPost} from "../entity/orderPost";
import {UserService} from "../service/user.service";
import {User} from "../entity/user";
import {OrderService} from "../service/order.service";

const USERNAME_KEY = 'Username';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  giftCertificates: GiftCertificate[];
  orderInfo: OrderPost = new OrderPost();
  user: User = new User();
  isCreated = false;
  isCreateFailed = false;
  errorMessage = '';

  constructor(private cartService: CartService, private userService: UserService, private orderService: OrderService) {
    this.giftCertificates = this.cartService.getGiftCertificates();
  }

  ngOnInit(): void {
    let login = sessionStorage.getItem(USERNAME_KEY);
    if (login !== null) {
      this.userService.getUserByLogin(login).subscribe(result => this.user = result);
    }
  }

  onSubmit() {
    this.giftCertificates.forEach((giftCertificate) => {
      this.orderInfo.giftCertificateId = giftCertificate.id
      this.orderInfo.userId = this.user.id
      this.orderService.createOrder(this.orderInfo)
        .subscribe(result => {
          console.log(result);
          this.isCreated = true;
        },
          error => {
            console.log(error);
            this.isCreated = false;
            this.isCreateFailed = true;
            this.errorMessage = error.error.errorMessage;
          })
    });

    this.giftCertificates = this.cartService.clearCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    window.location.reload();
  }
}
