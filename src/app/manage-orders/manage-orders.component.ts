import { Component, OnInit } from '@angular/core';
import {Order} from "../entity/order";
import {User} from "../entity/user";
import {OrderService} from "../service/order.service";
import {UserService} from "../service/user.service";
import {TokenStorageService} from "../auth/token-storage.service";

const FIRST_PAGE = '1';
const MAX_SIZE = '100';
const USERNAME_KEY = 'Username';
const EMPTY_STRING = '';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[] = [];
  page: string = FIRST_PAGE;
  size: string = MAX_SIZE;
  user: User = new User();
  userId: string = '';
  isDelete: boolean;
  isDeleteFailed: boolean;
  errorMessage: string;
  role: string = EMPTY_STRING;

  constructor(private orderService: OrderService,
              private userService: UserService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.role = this.tokenService.getRole();
    let login = sessionStorage.getItem(USERNAME_KEY);
    if (login !== null) {
      this.userService.getUserByLogin(login).subscribe(result => {
        this.user = result;
        this.userId = String(this.user.id);
        this.orderService.getOrders(this.page, this.size)
          .subscribe(result => this.orders = result);
      });
    }
  }

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order.id.toString()).subscribe(
      () => {
        this.isDelete = true;
        console.log('The order has been deleted');
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.errorMessage;
        this.isDelete = false;
        this.isDeleteFailed = true;
      }
    );
    window.location.reload();
  }
}
