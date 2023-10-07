import { SnackbarService } from './../snackbar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';
import { AuthUser } from '../models/user/auth-user.model';
import { AuthResponse } from '../models/user/authResponse';
import { GenericService } from '../service-layer/generic.service';
import { AuthService } from '../service-layer/auth.service';
import { EnumRoles } from '../models/roles/roles.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authModel!: AuthUser;
  response: any;
  showError: boolean = false;
  showExpiryError: boolean = true;
  constructor(
    private apiCall: AuthService,
    private router: Router,
    private snackbarSer: SnackbarService
  ) {
    this.authModel = new AuthUser();
  }

  ngOnInit(): void {}

  onLogin() {
    this.authModel.email = this.authModel.email; // converting taxNmuber from string tom int
    this.apiCall.login(this.authModel).subscribe(
      (res) => {
        this.response = res;
        console.log('pp', this.response.status);
        if (this.response.status == true) {
          sessionStorage.setItem('token', this.response.token);
          sessionStorage.setItem('userRole', this.response.role.name);
          sessionStorage.setItem('userId', this.response.id);
          sessionStorage.setItem('userName', this.response.name);
          sessionStorage.setItem(
            'endDate',
            this.response?.company?.license?.endDate
          );
          if (
            this.response.role.name === EnumRoles.SUPERADMIN ||
            this.response.role.name === EnumRoles.ADMIN
          ) {
            this.router.navigate(['/user']);
          } else if (this.response.role.name == EnumRoles.USER) {
            console.log('====================================');
            console.log('login response', this.response);
            console.log('====================================');
            this.router.navigate(['/items']);
            // if (this.response?.license?.endDate < Date.now()) {
            //   console.log('====================================');
            //   console.log("00000000");
            //   console.log('====================================');
            //   this.showExpiryError = true
            // }
          }

          this.showError = false;
          this.snackbarSer.openSnackBar('Welcome', 3000, 'notif-success');
        }
      },
      (err) => {
        // this.snackbarSer.openSnackBar(err.error.message, 3000, 'notif-fail'); //
      }
    );
  }
}
