import { Action } from '@ngrx/store';

import { DashboardActions, SET_STATE_DATA } from './dashboard.actions';
import { map } from 'rxjs/operators';

export interface State {
  map: Map<string, any[]>;
}

const initialState: State = {
  map: new Map(),
};

export function dashboardReducer(state = initialState, action: DashboardActions): State {
  switch (action.type) {
    case SET_STATE_DATA: {
      state.map.set(action.key, action.payload);
      return state;
    }
    default: {
      return state;
    }
  }
}

export const getStateData = (state: State) => state.map;
