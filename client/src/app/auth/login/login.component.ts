import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../auth.interface';
import { AuthFacade } from '../store/auth-facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(public authFacade: AuthFacade) {}

  login(): void {
    const user: User = {
      email: this.formGroup.controls['email'].value,
      password: this.formGroup.controls['password'].value,
    };
    this.authFacade.sendCredentials(user);
  }
}
