import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_AUTHENTICATED_USER_INFO = '[Auth] Set UserInfo';

export class SetAuthenticated implements Action {

  readonly type = SET_AUTHENTICATED;
  token: string;
  constructor(token: string){
    this.token = token;
  }
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetUserInfo implements Action {
  readonly type = SET_AUTHENTICATED_USER_INFO;
  user: any;
  constructor(user: any){
    this.user = user;
  }
}

export type AuthActions = SetAuthenticated | SetUnauthenticated | SetUserInfo;
