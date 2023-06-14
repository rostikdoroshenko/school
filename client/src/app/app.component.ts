import { Component, OnInit } from '@angular/core';
import { AuthFacade } from './auth/store/auth-facade';
import { AppFacade } from './store/facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authFacade: AuthFacade, public appFacade: AppFacade) {}

  ngOnInit() {
    this.authFacade.checkExpiredToken();
  }
}
