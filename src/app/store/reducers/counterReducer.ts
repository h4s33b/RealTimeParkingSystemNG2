import { Reducer, Action } from 'redux';
import { IAppState } from '../index';
import {
  CounterAction
} from '../actions/index';

let initialState: IAppState = {
  isLoggedIn: false, userData: { "email": "", "name": "", "cellNumber": "" }
};

// Create our reducer that will handle changes to the state
export const counterReducer: Reducer<IAppState> =
  (state: IAppState = initialState, action: { type: string, payload?: any }): IAppState => {
    switch (action.type) {
      case CounterAction.INCREMENTSUCCESS:
        return Object.assign({}, state, { counter: { counter: action.payload } });
      case CounterAction.DECREMENTSUCCESS:
        return Object.assign({}, state, { counter: { counter: action.payload } });
      case CounterAction.USERSIGNINSUCCESS:
        return Object.assign({}, state, { isLoggedIn: true, userData: { email: action.payload.email, name: action.payload.name, cellNumber: action.payload.cellNumber } });
      case CounterAction.USERLOGOUTSUCCESS:
        return Object.assign({}, state, { isLoggedIn: false });
      case CounterAction.UPDATEUSERSETTINGSSUCCESS:
        return Object.assign({}, state);
      case CounterAction.POSTJOBSSUCCESS:
        return Object.assign({}, state);
      case CounterAction.SIGNUPCOMPANYSUCCESS:
        return Object.assign({}, state, { isLoggedIn: true, userData: { email: action.payload.email, name: action.payload.name, cellNumber: action.payload.cellNumber } });
      case CounterAction.SIGNUPSTUDENTSUCCESS:
        return Object.assign({}, state, { isLoggedIn: true, userData: { email: action.payload.email, name: action.payload.name, cellNumber: action.payload.cellNumber } });
      case CounterAction.APPLYFORJOBSUCCESS:
        return Object.assign({}, state);
      case CounterAction.ADMINSIGNINSUCCESS:
        return Object.assign({}, state, { isLoggedIn: true, userData: { email: action.payload.email, name: action.payload.name, cellNumber: action.payload.cellNumber,isAdmin:action.payload.isAdmin } });


      default:
        return state;
    }
  };