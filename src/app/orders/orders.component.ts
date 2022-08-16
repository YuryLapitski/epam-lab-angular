import { Component, OnInit } from '@angular/core';
import {Order} from "../entity/order";
import {OrderService} from "../service/order.service";
import {UserService} from "../service/user.service";
import {User} from "../entity/user";

const FIRST_PAGE = '1';
const MAX_SIZE = '100';
const USERNAME_KEY = 'Username';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  page: string = FIRST_PAGE;
  size: string = MAX_SIZE;
  user: User = new User();
  userId: string = '';

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    let login = sessionStorage.getItem(USERNAME_KEY);
    if (login !== null) {
      this.userService.getUserByLogin(login).subscribe(result => {
        this.user = result;
        this.userId = String(this.user.id);
        this.orderService.getOrdersByUserId(String(this.user.id), this.page, this.size)
          .subscribe(result => this.orders = result);
      });
    }
  }
}
