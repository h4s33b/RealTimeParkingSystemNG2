import { IUserData } from './../../store/userObj';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgRedux, select } from 'ng2-redux';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  @select() userData$: Observable<boolean>;
  searchSlotsArea: number;
  avaialbleSlots;
  availableHours;
  userSelectedData; any;
  slotsForNipa: FirebaseListObservable<any>;
  slotsForSaddar: FirebaseListObservable<any>;
  slotsForNHaidari: FirebaseListObservable<any>;
  saveBooking: FirebaseListObservable<any>;
  getMyBookings: FirebaseListObservable<any>;
  showAvailable;
  mainRef;
  showBookingsData: any;
  searchBookings: any;
  feedbackdata: any;
  isLoggedIn: any;
  constructor(private af: AngularFire, public router: Router) {
    this.userData$.subscribe(val => {
      console.log("val", val);
      this.isLoggedIn = val;
    })
    this.feedbackdata = { "userMessage": "" };
    this.searchSlotsArea = 0;
    this.showAvailable = false;
    var dateObj = new Date();
    var month: any = dateObj.getUTCMonth(); //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    if (month < 9) {
      month = "0" + (month + 1);
    } else {
      month = (month + 1);
    }

    var newdate = year + "-" + month + "-" + day;
    this.userSelectedData = { "selectedTime": "", "selectedHr": "", "selectedDate": newdate };
    this.avaialbleSlots = [];
    for (var k = 0; k <= 23; k++) {
      if (k < 10) {
        this.avaialbleSlots.push({ value: "k" + k, viewValue: "0" + k + ":00" });
      } else {
        this.avaialbleSlots.push({ value: "k" + k, viewValue: k + ":00" });
      }
    }
    this.availableHours = [];
    for (var k = 0; k <= 18; k++) {
      if (k == 0) {
        this.availableHours.push({ value: "k" + k, viewValue: (k + 1) + " hr" });
      } else {
        this.availableHours.push({ value: "k" + k, viewValue: (k + 1) + " hrs" });
      }

    }
    this.mainRef = this.af.database;
    this.slotsForNipa = this.af.database.list('/parkingSlots/Nipa');
    this.slotsForSaddar = this.af.database.list('/parkingSlots/Saddar');
    this.slotsForNHaidari = this.af.database.list('/parkingSlots/haidari');
    this.saveBooking = this.af.database.list('/bookings');

    var slotLists = this.af.database.list('/parkingSlots', {
      query: {
        orderByChild: 'email',
        equalTo: this.isLoggedIn.userData.email
      }
    });
    this.showBookingsData = [];
    var subscribtion = slotLists.subscribe(val => {
      return Observable.from(val).filter(value => {
        if (value && !value.bookings) {
          return value
        }
      }).subscribe(abc => {
        this.showBookingsData.push(abc);
      });
    });


    this.getMyBookings = this.af.database.list('/bookings', {
      query: {
        orderByChild: 'email',
        equalTo: this.isLoggedIn.userData.email
      }
    });

    // var userList = this.af.database.list('/bookings', {
    //   query: {
    //     orderByChild: 'selectedDate',
    //     equalTo: '2017-01-27'
    //   }
    // });
    // this.searchBookings = [];
    // var subscribtion = userList.subscribe(val => {
    //   return Observable.from(val).filter(value => {
    //     if (value.status) {
    //       return value
    //     }
    //   }).subscribe(abc => {
    //     this.searchBookings.push(abc);
    //   });
    //   // this.searchBookings.push(val);
    // });
  }

  ngOnInit() {
  }

  searchSlots(areaID) {
    this.searchSlotsArea = areaID;
    this.showAvailable = false;
    // this.router.navigate(['search-time']);
  }

  showAvailableFun() {
    var splitBookingTime: any;
    var splitBookingTimeTime;
    var userSelectedTimeTime;
    var userSelectedHours;
    if (!this.userSelectedData.selectedTime || !this.userSelectedData.selectedHr || !this.userSelectedData.selectedDate) {
      alert("Please Select Start Time and Hours.");
    } else {
      this.showAvailable = true;
      var thisSlot = this.searchSlotsArea == 1 ? 'Saddar' : this.searchSlotsArea == 2 ? 'Nipa' : "haidari";
      this.mainRef.list('parkingSlots/' + thisSlot).subscribe(val => {
        val.forEach(element => {
          if (element.bookings) {
            var objectKeys = Object.keys(element.bookings);
            if (objectKeys.length) {
              for (var k = 0; k < objectKeys.length; k++) {
                splitBookingTime = element.bookings[objectKeys[k]].bookingSlot.split("_");
                splitBookingTimeTime = Number(splitBookingTime[2].split(":")[0] + splitBookingTime[2].split(":")[1]);
                userSelectedTimeTime = this.avaialbleSlots[this.userSelectedData.selectedTime.split("k")[1]].viewValue;
                userSelectedTimeTime = Number(userSelectedTimeTime.split(":")[0] + userSelectedTimeTime.split(":")[1]);
                userSelectedHours = Number(this.availableHours[this.userSelectedData.selectedHr.split("k")[1]].viewValue.split(" ")[0]) * 100;
                if (splitBookingTime[4] == this.userSelectedData.selectedDate && splitBookingTimeTime >= userSelectedTimeTime && splitBookingTimeTime + splitBookingTime[3] * 100 >= userSelectedTimeTime + userSelectedHours) {
                  console.log("Not Available 1", element.bookings[objectKeys[k]].bookingSlot);
                } else if (splitBookingTime[4] == this.userSelectedData.selectedDate && splitBookingTimeTime < userSelectedTimeTime && splitBookingTimeTime + splitBookingTime[3] * 100 <= userSelectedTimeTime + userSelectedHours) {
                  console.log("Not Available 2", element.bookings[objectKeys[k]].bookingSlot);
                } else {
                  console.log("Available");
                }
              }
            }
            // element.bookings.forEach(val2=>{
            //   console.log(element.bookings.val2);
            // })

          }
        });
      })
      //
    }
  }

  addBooking(data, area) {
    if (!this.userSelectedData.selectedTime || !this.userSelectedData.selectedHr || !this.userSelectedData.selectedDate) {
      alert("Please Select Start Time and Hours.");
    } else {
      var bookingObject: any = {
        "slotID": data,
        "area": area,
        "email": this.isLoggedIn.userData.email,
        "cellNumber": "456456645",
        "selectedTime": this.avaialbleSlots[this.userSelectedData.selectedTime.split("k")[1]].viewValue.split(" ")[0],
        "selectedHr": this.availableHours[this.userSelectedData.selectedHr.split("k")[1]].viewValue.split(" ")[0],
        "selectedDate": this.userSelectedData.selectedDate,
        "status": true
      }
      console.log(bookingObject);
      this.saveBooking.push(bookingObject);
      if (area == "Saddar") {
        this.mainRef.list('/parkingSlots/Saddar/' + data + "/bookings").push({ "bookingSlot": data + "_" + area + "_" + this.avaialbleSlots[this.userSelectedData.selectedTime.split("k")[1]].viewValue.split(" ")[0] + "_" + this.availableHours[this.userSelectedData.selectedHr.split("k")[1]].viewValue.split(" ")[0] + "_" + this.userSelectedData.selectedDate });
      } else if (area == "Nipa") {
        this.mainRef.list('/parkingSlots/Nipa/' + data + "/bookings").push({ "bookingSlot": data + "_" + area + "_" + this.avaialbleSlots[this.userSelectedData.selectedTime.split("k")[1]].viewValue.split(" ")[0] + "_" + this.availableHours[this.userSelectedData.selectedHr.split("k")[1]].viewValue.split(" ")[0] + "_" + this.userSelectedData.selectedDate });
      } else {
        this.mainRef.list('/parkingSlots/haidari/' + data + "/bookings").push({ "bookingSlot": data + "_" + area + "_" + this.avaialbleSlots[this.userSelectedData.selectedTime.split("k")[1]].viewValue.split(" ")[0] + "_" + this.availableHours[this.userSelectedData.selectedHr.split("k")[1]].viewValue.split(" ")[0] + "_" + this.userSelectedData.selectedDate });
      }

    }

    console.log(bookingObject);
  }

  cancelThisBooking(id) {
    this.saveBooking.update(id, { status: false });
  }

  sumbitFeedback(data) {
    data.email = this.isLoggedIn.userData.email;
    this.mainRef.list("feedback").push(data);
  }


}
