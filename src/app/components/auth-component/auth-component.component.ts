import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit {

  @Output() loginData: EventEmitter<any>;
  @Output() signUpData: EventEmitter<any>;
  public userLoginData: { "email": string, "password": string };
  public userSignUpData: { "email": string, "password": string, "name": string, "cellNumber": string };
  constructor() {
    this.signUpData = new EventEmitter<any>();
    this.loginData = new EventEmitter<any>();
    this.userLoginData = { "email": "", "password": "" };
    this.userSignUpData = { "email": "", "password": "", "name": "", "cellNumber": "" };
  }

  ngOnInit() {
  }

  public userLogin(isValid: boolean, f: any) {
    this.loginData.emit(f);
  }

  public signUpUser(isValid: boolean, f: any) {
    this.signUpData.emit(f);
  }

}
