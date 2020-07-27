import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './modules/auth/auth.reducer';
import * as fromDashboard from './modules/dashboard/dashboard.reducer';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
  dashboard: fromDashboard.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  dashboard: fromDashboard.dashboardReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
export const getSnack = createSelector(getUiState, fromUi.getSnack);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getToken = createSelector(getAuthState, fromAuth.getToken);
export const getUserInfo = createSelector(getAuthState, fromAuth.getUserInfo);

export const getDashboardState = createFeatureSelector<fromDashboard.State>('dashboard');
export const getStateData = createSelector(getDashboardState, fromDashboard.getStateData);
