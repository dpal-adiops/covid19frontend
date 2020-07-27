import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user$: Observable<any>;
  constructor(private tAuthService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.tAuthService.getUserInfo();
  }

}
