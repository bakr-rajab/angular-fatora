import { SnackbarService } from './../snackbar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '../models/user/auth-user.model';
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
  isLoading: boolean = false;
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
    this.authModel.email = this.authModel.email;
    this.isLoading = true;
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
          this.isLoading = false;
          if (
            this.response.role.name === EnumRoles.SUPERADMIN ||
            this.response.role.name === EnumRoles.ADMIN
          ) {
            this.router.navigate(['/user']);
          } else if (this.response.role.name == EnumRoles.USER) {
          
            if (this.response.company.endDate < new Date()) {
              this.snackbarSer.openSnackBar(
                'انتهت مدة الرخصه',
                3000,
                'notif-fail'
              );
              this.showExpiryError = true;
            }
            this.router.navigate(['/items']);
          }
          this.showError = false;
          this.snackbarSer.openSnackBar('Welcome', 3000, 'notif-success');
        }
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
        // this.snackbarSer.openSnackBar(err.error.message, 3000, 'notif-fail'); //
      }
    );
  }
}
