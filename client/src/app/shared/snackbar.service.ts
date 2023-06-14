import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum PanelClass {
  success = 'success-snackbar',
  error = 'error-snackbar',
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  openSnackbar(message: string, panelClass: string) {
    this.snackbar.open(message, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000,
      panelClass: panelClass,
    });
  }
}
