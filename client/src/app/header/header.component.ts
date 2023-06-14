import { Component, EventEmitter, Output } from '@angular/core';
import { AuthFacade } from '../auth/store/auth-facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() onMenuClickHandler = new EventEmitter();
  constructor(public authFacade: AuthFacade) {}

  logout(): void {
    this.authFacade.logoutUser();
  }

  onMenuClick() {
    this.onMenuClickHandler.emit();
  }
}
