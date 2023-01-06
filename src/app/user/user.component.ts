import { Component, OnInit } from '@angular/core';
import { SelectClient } from '../models/client/select-client.model';
import { GenericService } from '../service-layer/generic.service';

declare function paggnation():any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public clientModel = new  SelectClient();
  getUserModel:any
  usersRes:any
  usersList:any
  codesRequest:any;
  codesRes:any
  codeList:any
  code!:string
  selectedCode:any
  createUserReq:any
  email:any
  secretNo:any
  taxNo:any
  pass:any
  phoneNo:any
  userName:any
  editeUserReq:any
  selectedTaxNo:any
  deleteModel:any
  initTable:boolean=false
  clientId:any
  clientSecret1:any
  clientSecret2:any
  constructor(private apiCall: GenericService) { }

  ngOnInit(): void {
    
    sidebarToggling()
    this.getAllUser()
    this.getActivityCodes()
  }

  getAllUser(){
    this.getUserModel = {
      target:"user",
      action:"get_all_users"
      }
      this.apiCall.restServiceCall(this.getUserModel).subscribe(res =>{ 
        this.usersRes = res
        this.usersList = this.usersRes.data
        if(this.initTable== false){
          paggnation();
          this.initTable = true;
        } 
      })
    }

    getActivityCodes(){
      this.codesRequest={
        "target":"static",
        "action":"get_all_elements",
        "table_name":"commercial_activities"
        }
        this.apiCall.restServiceCall(this.codesRequest).subscribe(res =>{ 
          this.codesRes = res
          this.codeList = this.codesRes.data;
        })
    }

    createUser(){
      this.createUserReq={
        "target":"user",
        "action":"create",
        "email":this.email,
        "password":this.pass,
        "tax_number":Number(this.taxNo),
        "activity_code":this.code,
        "ph_number":Number(this.phoneNo),
        "name":this.userName,
        "client_id":this.clientId,
        "client_secret_1":this.clientSecret1,
        "client_secret_2":this.clientSecret2
        }
        this.apiCall.restServiceCall(this.createUserReq).subscribe(res =>{ 
        })
        this.getAllUser()
    }

    editeUser(){
      this.editeUserReq={
        "target":"user",
        "action":"edit",
        "unique_value":{
            "tax_number":Number(this.taxNo)
        }, 
        "name":this.userName,
        "ph_number":Number(this.phoneNo),
        "email":this.email,
        "activity_code":Number(this.code),
        "client_id":this.clientId,
        "client_secret_1":this.clientSecret1,
        "client_secret_2":this.clientSecret2
        }
        this.apiCall.restServiceCall(this.editeUserReq).subscribe(res =>{ 
        })
        this.getAllUser()
    }
    setUserTorm(id:any){
      this.deleteModel={
        "target":"user",
        "action":"delete",
        "key":"user_id",
        "value": id
      }
      this.apiCall.restServiceCall(this.deleteModel).subscribe(res =>{ 
      })
      this.getAllUser()
    }
    setcode(){
      this.code = this.selectedCode.code
      console.log(this.code);
    }
    setTaxNo(user:any){
      //this.selectedTaxNo = user.tax_number
      this.phoneNo = user.ph_number
      this.email = user.email
      this.taxNo = user.tax_number
      this.selectedCode = user.activity_code
      this.userName = user.name
    }

    resetAddModal(){
      this.userName =""
      this.email=""
      this.pass =""
      this.taxNo=""
      this.phoneNo=""
      this.clientId=""
      this.clientSecret1=""
      this.clientSecret2=""
      this.selectedCode=""
    }
}

