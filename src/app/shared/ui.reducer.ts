import { Action } from '@ngrx/store';

import { UIActions, START_LOADING, STOP_LOADING, ADD_SNACK } from './ui.actions';

export interface State {
  isLoading: boolean;
  snack?: string;
}

const initialState: State = {
  isLoading: false,
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true
      };
    case STOP_LOADING:
      return {
        isLoading: false
      };
      case ADD_SNACK:
        return {
          isLoading: false,
          snack: action.message
        };
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;

export const getSnack = (state: State) => state.snack;
