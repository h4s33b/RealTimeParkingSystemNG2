import { IUserData } from './../../store/userObj';
import { Component, OnInit, Output } from '@angular/core';
import { CounterAction } from '../../store/actions/index';
import { AuthComponentComponent } from '../../components/auth-component/auth-component.component';
import { NgRedux, select } from 'ng2-redux';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.css']
})
export class AuthContainerComponent implements OnInit {

  @select() userData$: Observable<boolean>;
  public isLoggedIn :any;
  constructor(private counterAction: CounterAction, private router: Router) {
    this.userData$.subscribe(val => {
      console.log("val", val);
      this.isLoggedIn = val;
      /**
       * TODO have to set it up.
       */
      if(!this.isLoggedIn.isLoggedIn){
        this.router.navigate(['']);
      }else if(this.isLoggedIn.isLoggedIn && !this.isLoggedIn.userData.isAdmin){
        this.router.navigate(['user-homepage']);
      }else if(this.isLoggedIn.isLoggedIn){
        this.router.navigate(['admin-homepage']);
      }
    })
  }

  ngOnInit() {
  }

  signUpUser(userData) {
    this.counterAction.signupStudent(userData);
  }

  loginUser(userData) {
    this.counterAction.userSignIn(userData);
  }

}
