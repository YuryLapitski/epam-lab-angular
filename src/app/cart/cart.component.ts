import { Component, OnInit } from '@angular/core';
import {CartService} from "../service/cart.service";
import {FormBuilder} from "@angular/forms";
import {GiftCertificate} from "../entity/giftCertificate";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: any;
  checkoutForm: any;

  constructor(private cartService: CartService, private formBuilder: FormBuilder) {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(customerData: any) {
    console.warn('Your order has been submitted', customerData);
    console.log(window.sessionStorage.getItem('gift-certificates'))
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }

  clearCart(): void {
    this.cartService.clearCart();
    window.location.reload();
  }
}
