import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer';
import * as Auth from './auth.actions';
import * as UI from './../../shared/ui.actions';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token$: Observable<string>;
  user$: Observable<any>;

  headers = new HttpHeaders({
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    Authorization: 'Basic YXBwLWNsaWVudDphcHAtc2VjcmV0'
  });





  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private router: Router) {

  }

  initAuthListener(): void {
    this.store.select(fromRoot.getIsAuth).subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/dashboard']);
        this.token$ = this.store.select(fromRoot.getToken);
        this.user$ = this.store.select(fromRoot.getUserInfo);
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  login(username: string, password: string): void {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    this.http.post<any>(`${environment.APP_URL}/oauth/token`,
      params.toString(), { headers: this.headers })
      .subscribe(
        data => {
          const token = data.access_token;
          this.store.dispatch(new Auth.SetAuthenticated(token));
          this.fetchUserInfo(token);
        },
        err => this.store.dispatch(new UI.SnackLoading('Invalid credentails')));
  }

  private fetchUserInfo(token: string): void {
    const tHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: `Bearer ${token}`
    });
    this.http.get<any>(`${environment.APP_URL}/user`, { headers: tHeaders })
      .subscribe(
        data => {
          this.store.dispatch(new Auth.SetUserInfo(data));
        },
        err =>  this.store.dispatch(new UI.SnackLoading('Invalid credentails'))
      );
  }

  getUserInfo(): Observable<any>{
    return this.user$;
  }

  logout(): void {
    this.store.dispatch(new Auth.SetUnauthenticated());
    this.router.navigate(['/login']);
  }

  register(formdata: any): void{
    const tHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
    });
    this.http.post<any>(`${environment.APP_URL}/user`,
    formdata , { headers: tHeaders })
      .subscribe(
        data => {
         this.store.dispatch(new UI.SnackLoading('User has been registered'));
        },
        err =>  this.store.dispatch(new UI.SnackLoading('User is already exist. Please check your email for password')));
  }

}
