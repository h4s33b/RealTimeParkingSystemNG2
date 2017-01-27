import { Component, OnInit } from '@angular/core';
import { AdminComponentComponent } from '../../components/admin-component/admin-component.component';
import { CounterAction } from '../../store/actions/index';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.css']
})
export class AdminContainerComponent implements OnInit {

  constructor(private counterAction:CounterAction) { }

  ngOnInit() {
  }
  logoutUser() {
    this.counterAction.logoutUser();
  }
}
