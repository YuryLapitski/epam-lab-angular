import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from "../auth/signup-info";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  form: any = {};
  signUpInfo!: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form);

    this.signUpInfo = new SignUpInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.login,
      this.form.password);

    this.authService.signUp(this.signUpInfo).subscribe(
      data => {
        console.log('SignUpComponent data: ' + data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
