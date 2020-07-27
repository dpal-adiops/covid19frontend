import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  hide = true;
  form: FormGroup;
  @Output() showlogin = new EventEmitter();
  constructor(private tAuthService: AuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      user_name:  new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
    });

  }

  submit(): void {
   const data = this.form.value;
   this.tAuthService.register(data);
   this.showLogin();
  }

  showLogin(): void {
    this.showlogin.emit(true);
  }

  getErrorMessage(): string {
    if (this.form.get('username').hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('username').hasError('email') ? 'Not a valid email' : '';
  }

}
