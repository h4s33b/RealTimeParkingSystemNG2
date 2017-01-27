import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

import { CounterAction } from '../actions/index';

@Injectable()
export class CounterEpics {

    constructor(public af: AngularFire) { }

    userSignIn = (action$) =>
        action$.ofType(CounterAction.USERSIGNIN)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                return this.af.auth.login({
                    email: payload.email,
                    password: payload.password,
                },
                    {
                        provider: AuthProviders.Password,
                        method: AuthMethods.Password,
                    }).then(auth => {
                        return {
                            type: CounterAction.USERSIGNINSUCCESSMIDDLE,
                            payload: auth.uid
                        };
                    }).catch(err => {
                        return Observable.of(null)
                    });
            });


    getUserData = (action$) =>
        action$.ofType(CounterAction.USERSIGNINSUCCESSMIDDLE)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                return this.af.database.object(`users/${payload}`)
                    .catch(err => {
                        return Observable.of(null)
                    })
                    .map((checkedInObject) => {
                        if (checkedInObject && !checkedInObject.isAdmin) {
                            return {
                                type: CounterAction.USERSIGNINSUCCESS,
                                payload: checkedInObject
                            }
                        }else{
                            return {
                                type: CounterAction.ADMINSIGNINSUCCESS,
                                payload: checkedInObject
                            }  
                        }
                    })
            });

    userLogout = (action$) =>
        action$.ofType(CounterAction.USERLOGOUT)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                this.af.auth.logout();
                return Observable.of({
                    type: CounterAction.USERLOGOUTSUCCESS
                });
            });

    updateUserSettings = (action$) =>
        action$.ofType(CounterAction.UPDATEUSERSETTINGS)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                return this.af.database.object(`users/${payload.userID}`).set(payload)
                    .then(auth => {
                        console.log(auth);
                        return {
                            type: CounterAction.UPDATEUSERSETTINGSSUCCESS
                        }
                    }).catch(error => {
                        console.log(error);
                        return {
                            type: CounterAction.UPDATEUSERSETTINGSSUCCESS
                        }
                    });
            });

    postJob = (action$) =>
        action$.ofType(CounterAction.POSTJOBS)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                var currentTime = new Date();
                return this.af.database.object(`jobs/${payload.userID}/${currentTime.getMilliseconds()}`).set(payload)
                    .then(auth => {
                        console.log(auth);
                        return {
                            type: CounterAction.POSTJOBSSUCCESS
                        }
                    }).catch(error => {
                        console.log(error);
                        return {
                            type: CounterAction.POSTJOBSSUCCESS
                        }
                    });
            });

    signupCompany = (action$) =>
        action$.ofType(CounterAction.SIGNUPCOMPANY)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                return this.af.auth.createUser({
                    email: payload.email,
                    password: payload.password,
                }).then(auth => {
                    console.log(auth);
                    payload.userID = auth.uid;
                    return this.af.database.object(`users/` + auth.uid).set(payload)
                        .then(auth => {
                            console.log(auth);
                            return {
                                type: CounterAction.SIGNUPCOMPANYSUCCESS,
                                payload: payload.userID

                            }
                        }).catch(error => {
                            console.log(error);
                            return {
                                type: CounterAction.SIGNUPCOMPANYSUCCESS,
                                payload: payload.userID
                            }
                        });
                }).catch(error => {
                    console.log(error)
                    return {
                        type: CounterAction.SIGNUPCOMPANYSUCCESS,
                        payload: payload.userID
                    }
                });
            });

    signupStudent = (action$) =>
        action$.ofType(CounterAction.SIGNUPSTUDENT)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                return this.af.auth.createUser({
                    email: payload.email,
                    password: payload.password,
                }).then(auth => {
                    console.log(auth);
                    payload.userID = auth.uid;
                    delete payload['password'];
                    return this.af.database.object(`users/` + auth.uid).set(payload)
                        .then(auth => {
                            console.log(auth);
                            return {
                                type: CounterAction.USERSIGNINSUCCESSMIDDLE,
                                payload: payload.userID
                            }
                        }).catch(error => {
                            console.log(error);
                            return {
                                type: CounterAction.USERSIGNINSUCCESSMIDDLE,
                                payload: payload.userID
                            }
                        });
                }).catch(error => {
                    console.log(error)
                    return {
                        type: CounterAction.USERSIGNINSUCCESSMIDDLE,
                        payload: payload.userID
                    }
                });
            });

    applyForJob = (action$) =>
        action$.ofType(CounterAction.APPLYFORJOB)
            .do((val) => {
                console.log("UserData", val);
            })
            .switchMap(({payload}) => {
                return this.af.database.list(`applications`).push(payload)
                    .then(auth => {
                        console.log(auth);
                        return {
                            type: CounterAction.APPLYFORJOBSUCCESS
                        }
                    }).catch(error => {
                        console.log(error);
                        return {
                            type: CounterAction.APPLYFORJOBSUCCESS
                        }
                    });
            });
}