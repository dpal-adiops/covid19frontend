import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../app.reducer';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {
  toggle = true;
  snack$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.snack$ = this.store.select(fromRoot.getSnack);
  }

}
