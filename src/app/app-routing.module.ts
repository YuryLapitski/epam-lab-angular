import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./signup/signup.component";
import {UserComponent} from "./user/user.component";
import {CertificateComponent} from "./certificate/certificate.component";
import {CartComponent} from "./cart/cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {CreateGiftCertificateComponent} from "./create-gift-certificate/create-gift-certificate.component";
import {UpdateGiftCertificateComponent} from "./update-gift-certificate/update-gift-certificate.component";
import {ManageUsersComponent} from "./manage-users/manage-users.component";
import {ManageOrdersComponent} from "./manage-orders/manage-orders.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'gift-certificates/:giftCertificateId',
    component: CertificateComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'create-gift-certificate',
    component: CreateGiftCertificateComponent
  },
  {
    path: 'update-gift-certificate/:giftCertificateId',
    component: UpdateGiftCertificateComponent
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent
  },
  {
    path: 'manage-orders',
    component: ManageOrdersComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
