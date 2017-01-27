import { AdminGuard } from './guards/admin';
import { UserGuard } from './guards/users';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from 'ng2-redux';
import { StoreModule } from './store';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import { UserContainerComponent } from './containers/user-container/user-container.component';
import { UserComponentComponent } from './components/user-component/user-component.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { UserBookslotComponentComponent } from './components/user-bookslot-component/user-bookslot-component.component';


const appRoutes: Routes = [
  // { path: 'home', component: HomeContainerComponent, canActivate: [LoggedInGuard] },
  // { path: 'signUp', component: SignupComponentComponent },
  // { path: 'settings', component: SettingsComponent, canActivate: [LoggedInGuard] },
  // { path: 'students-settings', component: StudentSettingsComponent, canActivate: [StudentGuard] },
  // { path: 'company-list', component: StudentContainerComponent, canActivate: [StudentGuard] },
  // { path: 'student-details/:id', component: StudentDetailComponentComponent, canActivate: [LoggedInGuard] },
  // {
  //   path: 'company-details-small/:id', component: CompanyDetailsSmallComponentComponent, canActivate: [StudentGuard]
  // },
  {
    // path: 'company-details/:id', component: CompanyDetailComponentComponent,
    // children: [
    //   { path: '', redirectTo: 'viewJobs;', pathMatch: 'full' },
    //   { path: 'viewJobs', component: CompanyViewJobComponentComponent },
    //   { path: 'postJob', component: CompanyPostJobComponentComponent }
    // ], canActivate: [LoggedInGuard]
    path: 'admin-homepage', component: AdminContainerComponent, canActivate: [AdminGuard]
    // , canActivate: [UserGuard]
  },
  {
    // path: 'company-details/:id', component: CompanyDetailComponentComponent,
    // children: [
    //   { path: '', redirectTo: 'viewJobs;', pathMatch: 'full' },
    //   { path: 'viewJobs', component: CompanyViewJobComponentComponent },
    //   { path: 'postJob', component: CompanyPostJobComponentComponent }
    // ], canActivate: [LoggedInGuard]
    path: 'user-homepage', component: UserContainerComponent
    // children: [
    //   { path: '', redirectTo: 'search-time', pathMatch: 'full' },
    //   { path: 'search-time', component: UserBookslotComponentComponent }
    // ]
    , canActivate: [UserGuard]
  },
  // { path: 'admin', component: AdminContainerComponent},
  { path: '', component: AuthContainerComponent }

];


export const firebaseConfig = {
  apiKey: "AIzaSyCGg_LW4u3isCVTsDEwEFE-MECvvxzFVrw",
  authDomain: "ng2realtimeparkingmanagement.firebaseapp.com",
  databaseURL: "https://ng2realtimeparkingmanagement.firebaseio.com",
  storageBucket: "ng2realtimeparkingmanagement.appspot.com",
  messagingSenderId: "983695461003"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Password
};




@NgModule({
  declarations: [
    AppComponent,
    AuthContainerComponent,
    AuthComponentComponent,
    UserContainerComponent,
    UserComponentComponent,
    AdminComponentComponent,
    AdminContainerComponent,
    UserBookslotComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    NgReduxModule,
    StoreModule
  ],
  providers: [UserGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
