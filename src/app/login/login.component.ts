import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';
import { AuthUser } from '../models/user/auth-user.model';
import { AuthResponse } from '../models/user/authResponse';
import { GenericService } from '../service-layer/generic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authModel : AuthUser;
  response : any;
  showError: boolean = false
  showExpiryError:boolean = true
  constructor(private apiCall: GenericService, private router: Router) {
    this.authModel = new AuthUser()
   }

  ngOnInit(): void {
  }

  onLogin(){
    this.authModel.action = "auth";
    this.authModel.target = "user";
    this.authModel.tax_number = Number(this.authModel.tax_number); // converting taxNmuber from string tom int
    this.apiCall.restServiceCall(this.authModel).subscribe(res =>{
      this.response = res;
      if(this.response.status == true){
          sessionStorage.setItem('userRole', this.response.data[0].user_role)
          sessionStorage.setItem('userId', this.response.data[0].user_id)
          sessionStorage.setItem('userName', this.response.data[0].name)
          if(this.response.data[0].user_role == 'admin'){
            this.router.navigate(['/user'])
          }else if(this.response.data[0].user_role == 'user'){
            if(this.response.expire == false){
              this.router.navigate(['/analytics'])
            }else{
              this.showExpiryError = false
            }
          }
          this.showError = false
      }else{
        this.showError = true;
      }
        
    })
  }
}
