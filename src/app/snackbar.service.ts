import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  // Display a snackbar with a given message
  openSnackBar(
    message: string,
    duration: number = 300070,
    cssClass: string = ''
  ) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: duration,
      direction: 'rtl',
      panelClass: [cssClass],
    });
  }
}
