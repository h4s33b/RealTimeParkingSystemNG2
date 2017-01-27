import { IUserData } from './../../store/userObj';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgRedux, select } from 'ng2-redux';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {
  @select() userData$: Observable<boolean>;
  searchSlotsArea: number;
  avaialbleSlots;
  availableHours;
  userSelectedData; any;
  slotsForNipa: FirebaseListObservable<any>;
  slotsForSaddar: FirebaseListObservable<any>;
  slotsForNHaidari: FirebaseListObservable<any>;
  allBookings: FirebaseListObservable<any>;
  getMyBookings: FirebaseListObservable<any>;
  showAvailable;
  mainRef;
  showBookingsData: any;
  searchBookings: any;
  feedbackdata: any;
  isLoggedIn : any;
  constructor(private af:AngularFire) { 
    this.mainRef = this.af.database;
    this.allBookings = this.af.database.list('/bookings');
    this.feedbackdata = this.af.database.list('/feedback');
  }

  ngOnInit() {
  }

  deleteFeedback(data) {
    data.email = this.isLoggedIn.userData.email;
    this.mainRef.list("feedback").push(data);
  }

  cancelThisBooking(id) {
    this.allBookings.update(id, { status: false });
  }
}
