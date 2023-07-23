import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';
import { AuthUser } from '../models/user/auth-user.model';
import { AuthResponse } from '../models/user/authResponse';
import { GenericService } from '../service-layer/generic.service';
import { AuthService } from '../service-layer/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authModel!: AuthUser;
  response: any;
  showError: boolean = false
  showExpiryError: boolean = true
  constructor(private apiCall: AuthService, private router: Router) {
    this.authModel = new AuthUser()
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.authModel.email = this.authModel.email; // converting taxNmuber from string tom int

    console.log(this.authModel);

    this.apiCall.login(this.authModel).subscribe(res => {
      this.response = res;
      if (this.response.status == true) {
        console.log("pp", this.response)
        console.log(Date.now())
        sessionStorage.setItem('token', this.response.token)
        sessionStorage.setItem('userRole', this.response.role.name)
        sessionStorage.setItem('userId', this.response.id)
        sessionStorage.setItem('userName', this.response.name)
        sessionStorage.setItem('endDate', this.response?.license?.endDate)
        if (this.response.role.name === 'superAdmin' || this.response.role.name === 'admin') {
          this.router.navigate(['/user'])
        } else if (this.response.role.name == 'user') {
          this.router.navigate(['/analytics'])
          if (this.response?.license?.endDate < Date.now()) {
            this.showExpiryError = true
          }
        }
        this.showError = false
      } else {
        this.showError = true;
      }
    })
  }
}
