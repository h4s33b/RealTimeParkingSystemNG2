import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFire, } from 'angularfire2';
import { Router } from '@angular/router'
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import { IAppState } from '../store';
import { CounterAction } from '../store/actions/index';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs';



@Injectable()
export class LoggedInGuard implements CanActivate {
 @select() userData$: Observable<boolean>;
    userData;
    constructor(public af: AngularFire, private router: Router, private counterAction: CounterAction) {
        this.userData$.subscribe(val => {
            this.userData = val;
        })
    }

    canActivate() {
        return this.af.auth.take(1).map(authState => {
            if (authState && this.af.auth.getAuth().auth && this.af.auth.getAuth().auth.email=="admin@test.com") {
                true;
            } else {
                return false;
            }
        })
        //return true;
    }
}