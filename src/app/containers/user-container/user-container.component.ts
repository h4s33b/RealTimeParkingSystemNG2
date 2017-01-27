import { Component, OnInit } from '@angular/core';
import { CounterAction } from '../../store/actions/index';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {

  constructor(private counterAction:CounterAction) { }

  ngOnInit() {
  }

  logoutUser() {
    this.counterAction.logoutUser();
  }

}
