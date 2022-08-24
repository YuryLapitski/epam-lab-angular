import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {GiftCertificateService} from "./service/gift-certificate.service";
import { CertificateComponent } from './certificate/certificate.component';
import { CartComponent } from './cart/cart.component';
import {CartService} from "./service/cart.service";
import {UserService} from "./service/user.service";
import { OrdersComponent } from './orders/orders.component';
import { CreateGiftCertificateComponent } from './create-gift-certificate/create-gift-certificate.component';
import { UpdateGiftCertificateComponent } from './update-gift-certificate/update-gift-certificate.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    CertificateComponent,
    CartComponent,
    OrdersComponent,
    CreateGiftCertificateComponent,
    UpdateGiftCertificateComponent,
    ManageUsersComponent,
    ManageOrdersComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    httpInterceptorProviders,
    GiftCertificateService,
    CartService,
    UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
