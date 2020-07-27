import { Action } from '@ngrx/store';

import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_AUTHENTICATED_USER_INFO } from './auth.actions';
import { map } from 'rxjs/operators';

export interface State {
  isAuthenticated: boolean;
  token: string;
  user?: any;
}

const initialState: State = {
  isAuthenticated: false,
  token: null
};

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true,
        token: action.token
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false,
        token: null
      };
      case SET_AUTHENTICATED_USER_INFO:
      return  {user: action.user , isAuthenticated: state.isAuthenticated , token: state.token};
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getToken = (state: State) => state.token;
export const getUserInfo = (state: State) => state.user;
