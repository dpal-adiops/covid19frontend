import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

export const ADD_SNACK = '[UI] Snack Loading';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}


export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class SnackLoading implements Action {
  readonly type = ADD_SNACK;
  message: string;
  constructor(message: string){
    this.message = message;
  }
}

export type UIActions = StartLoading | StopLoading | SnackLoading;
