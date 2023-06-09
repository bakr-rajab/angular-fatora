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
    this.authModel.taxNumber = Number(this.authModel.taxNumber); // converting taxNmuber from string tom int

    this.apiCall.login(this.authModel).subscribe(res => {
      this.response = res;
      if (this.response.status == true) {
        console.log("pp", this.response)
        sessionStorage.setItem('userRole', this.response.role.name)
        sessionStorage.setItem('userId', this.response.id)
        sessionStorage.setItem('userName', this.response.name)
        if (this.response.role.name == 'superAdmin') {
          console.log("object")
          this.router.navigate(['/user'])
        } else if (this.response.role.name == 'user') {
          if (this.response.expire == false) {
            this.router.navigate(['/analytics'])
          } else {
            this.showExpiryError = false
          }
        }

        this.showError = false
      } else {
        this.showError = true;
      }
    })
  }
}
