import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {User} from "../entity/user";
import {UserService} from "../service/user.service";

const FIRST_PAGE = '1';
const MAX_SIZE = '100';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  role: string;
  users: User[];

  constructor(private userService: UserService, private tokenService: TokenStorageService) {
    this.role = this.tokenService.getRole();
  }

  ngOnInit(): void {
    this.userService.getAllUsers(FIRST_PAGE, MAX_SIZE).subscribe(result => this.users = result);
  }
}
