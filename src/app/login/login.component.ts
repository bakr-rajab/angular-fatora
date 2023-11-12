import { SnackbarService } from './../snackbar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';
import { AuthUser } from '../models/user/auth-user.model';
import { AuthResponse } from '../models/user/authResponse';
import { GenericService } from '../service-layer/generic.service';
import { AuthService } from '../service-layer/auth.service';
import { EnumRoles } from '../models/roles/roles.model';
import { LocalStorageService } from '../service-layer/local-storage.service';

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
    private snackbarSer: SnackbarService,
    private localStorage: LocalStorageService
  ) {
    this.authModel = new AuthUser();
  }

  ngOnInit(): void {
    const role = this.localStorage.getItem('userRole');
    if (role) {
      if (role === EnumRoles.USER) {
        this.router.navigate(['/items']);
      }
      this.router.navigate(['/user']);
    }
  }

  onLogin() {
    this.authModel.email = this.authModel.email; // converting taxNmuber from string tom int
    this.apiCall.login(this.authModel).subscribe(
      (res) => {
        this.response = res;
        if (this.response.status == true) {
          this.localStorage.setItem('token', this.response.token);
          this.localStorage.setItem('userRole', this.response.role.name);
          this.localStorage.setItem('userId', this.response.id);
          this.localStorage.setItem('userName', this.response.name);
          this.localStorage.setItem('internalId', this.response.internalId);
          this.localStorage.setItem('endDate', this.response?.company?.endDate);
          if (
            this.response.role.name === EnumRoles.SUPERADMIN ||
            this.response.role.name === EnumRoles.ADMIN
          ) {
            this.router.navigate(['/user']);
          } else if (this.response.role.name == EnumRoles.USER) {
            console.log('====================================');
            console.log('login response', this.response);
            console.log('====================================');
            if (this.response.company.endDate < new Date()) {
              this.snackbarSer.openSnackBar(
                'انتهت مدة الرخصه',
                3000,
                'notif-fail'
              );
              this.showExpiryError = true;
            }
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
        console.log(err);

        // this.snackbarSer.openSnackBar(err.error.message, 3000, 'notif-fail'); //
      }
    );
  }
}
