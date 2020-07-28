import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../app.reducer';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;
  error: string;
  @Output() showsignup = new EventEmitter();

  constructor(private tAuthService: AuthService,
              private snackBar: MatSnackBar,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit(): void {
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;
    this.tAuthService.login(username, password);
    this.store.select(fromRoot.getSnack).subscribe(msg => {
      if(msg){
        this.openSnackBar(msg, 'Invalid Request');
      }
    });

  }

  openSnackBar(message: string, action?: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  signup(): void {
    this.showsignup.emit(true);
  }
}
