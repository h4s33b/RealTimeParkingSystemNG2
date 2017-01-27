import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../';
//import { ILogin } from '../models';

@Injectable()
export class CounterAction {

    static INCREMENT: string = 'INCREMENT';
    static DECREMENT: string = 'DECREMENT';
    static INCREMENTSUCCESS: string = 'INCREMENTSUCCESS';
    static DECREMENTSUCCESS: string = 'DECREMENTSUCCESS';
    static USERSIGNIN: string = 'USERSIGNIN';
    static USERSIGNINSUCCESS: string = 'USERSIGNINSUCCESS';
    static ADMINSIGNINSUCCESS: string = 'ADMINSIGNINSUCCESS';
    static USERSIGNINSUCCESSMIDDLE: string = 'USERSIGNINSUCCESSMIDDLE';
    static USERLOGOUT: string = 'USERLOGOUT';
    static USERLOGOUTSUCCESS: string = 'USERLOGOUTSUCCESS';
    static UPDATEUSERSETTINGS: string = 'UPDATEUSERSETTINGS';
    static UPDATEUSERSETTINGSSUCCESS: string = 'UPDATEUSERSETTINGSSUCCESS';
    static POSTJOBSSUCCESS: string = 'POSTJOBSSUCCESS';
    static POSTJOBS: string = 'POSTJOBS';
    static SIGNUPCOMPANY: string = 'SIGNUPCOMPANY';
    static SIGNUPCOMPANYSUCCESS: string = 'SIGNUPCOMPANYSUCCESS';
    static SIGNUPSTUDENT: string = 'SIGNUPSTUDENT';
    static SIGNUPSTUDENTSUCCESS: string = 'SIGNUPSTUDENTSUCCESS';
    static APPLYFORJOB: string = 'APPLYFORJOB';
    static APPLYFORJOBSUCCESS: string = 'APPLYFORJOBSUCCESS';

    constructor(private ngRedux: NgRedux<IAppState>) {
    }
    
    userSignIn(userObj): void {
        this.ngRedux.dispatch({ type: CounterAction.USERSIGNIN, payload: userObj });
    }

    logoutUser() {
        this.ngRedux.dispatch({ type: CounterAction.USERLOGOUT });
    }

    updateUserSettings(f) {
        this.ngRedux.dispatch({ type: CounterAction.UPDATEUSERSETTINGS, payload: f });
    }
    postJob(f) {
        this.ngRedux.dispatch({ type: CounterAction.POSTJOBS, payload: f });
    }

    signupCompany(f) {
        this.ngRedux.dispatch({ type: CounterAction.SIGNUPCOMPANY, payload: f });
    }

    signupStudent(f) {
        this.ngRedux.dispatch({ type: CounterAction.SIGNUPSTUDENT, payload: f });
    }

    applyForJob(f) {
        this.ngRedux.dispatch({ type: CounterAction.APPLYFORJOB, payload: f });
    }


}
