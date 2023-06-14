import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { delay, Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../auth.interface';
import { PanelClass, SnackbarService } from '../../shared/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  formGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnDestroy() {
    this.destroy$.next(false);
  }
  signup() {
    this.isLoading = true;

    const user: User = {
      email: this.formGroup.controls['email'].value,
      password: this.formGroup.controls['password'].value,
    };
    this.authService
      .createUser(user)
      .pipe(delay(1000), takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']).finally();
          this.snackbarService.openSnackbar(
            'Registered Successfully!',
            PanelClass.success,
          );
        },
        error: (err: HttpErrorResponse) =>
          this.snackbarService.openSnackbar(err.message, PanelClass.error),
        complete: () => (this.isLoading = false),
      });
  }
}
