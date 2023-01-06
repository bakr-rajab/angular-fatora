import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../service-layer/generic.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  comment:any
  getUserReq:any
  getUserRes:any
  name:any
  phone:any
  mail:any
  taxNumber:any
  showError:any
  secNo:any
  constructor(private apiCall: GenericService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(){
    this.getUserReq={
      "target":"user",
      "action":"get_user",
      "user_id":sessionStorage.getItem('userId')
  }
  this.apiCall.restServiceCall(this.getUserReq).subscribe(res =>{
   this.getUserRes = res
    this.name = this.getUserRes.data[0].name
    this.phone = this.getUserRes.data[0].ph_number
    this.mail = this.getUserRes.data[0].email
    this.taxNumber = this.getUserRes.data[0].tax_number
  })
  }

  editeUser(){
    this.getUserReq={
      "target":"user",
      "action":"edit",
      "unique_value":{
          "tax_number":this.taxNumber
      },
      "name":this.name,
      "ph_number":Number(this.phone),
      "email":this.mail,
      "password":this.secNo
    }
    this.apiCall.restServiceCall(this.getUserReq).subscribe(res =>{
        this.getUserRes = res
        if(this.getUserRes.status == true){
          history.back()
          //this.router.navigate(['/salesInvoice']);
        }else{
          this.showError = true
        }
     })
  }
}
