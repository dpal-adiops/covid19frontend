import { Action } from '@ngrx/store';

export const SET_STATE_DATA = '[Dashboard] Set Statewise';


export class SetDashboardData implements Action {
  readonly type = SET_STATE_DATA;
  key: string;
  payload: any[];
  constructor(key: string, payload: any[]){
    this.payload = payload;
    this.key = key;
  }
}

export type DashboardActions = SetDashboardData;
