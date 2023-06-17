import { Component, OnInit } from '@angular/core';
import { GetPrograms } from '../models/programs/getPrograms';
import { GenericService } from '../service-layer/generic.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

declare function paggnation(): any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  usersModel: any
  licenseModel: any
  usersRes: any
  usersList: any
  response: any;
  licenseList: any
  selectedUser: any
  selectedPlane: any
  userId: any
  planId: any
  addLicenseModel: any
  licenseToRm: any
  programsModel: GetPrograms = new GetPrograms;
  plans: any
  rmLicenseModel: any
  initTable: boolean = false

  constructor(private apiCall: GenericService) { }

  ngOnInit(): void {
    sidebarToggling();
    this.getAllLicense();
    this.getAllPlans();
    this.getAllUsers();
  }

  getAllLicense() {
    this.licenseModel = {
      target: "license",
      action: "get_all_licenses"
    }
    this.apiCall.restServiceCall(this.licenseModel).subscribe(res => {
      this.response = res
      this.licenseList = this.response.data;
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    })
  }

  getAllUsers() {
    this.usersModel = {
      target: "user",
      action: "get_all_users"
    }
    this.apiCall.restServiceCall(this.usersModel).subscribe(res => {
      this.usersRes = res
      this.usersList = this.usersRes.data;
    })
  }

  getAllPlans() {
    this.programsModel.target = "plan"
    this.programsModel.action = "get_all_plans"
    this.apiCall.restServiceCall(this.programsModel).subscribe(res => {
      this.response = res;
      this.plans = this.response.data;
    })
  }
  addLicense() {
    this.addLicenseModel = {
      target: "license",
      action: "create",
      user_id: this.userId,
      plan_id: this.planId
    }
    this.apiCall.restServiceCall(this.addLicenseModel).subscribe(res => {
    })
    this.getAllLicense()
  }

  rmLicense(id: any) {
    this.rmLicenseModel = {
      "target": "license",
      "action": "delete",
      "key": "license_id",
      "value": id
    }
    this.apiCall.restServiceCall(this.rmLicenseModel).subscribe(res => {
    })
    this.getAllLicense()
  }
  setUserId() {
    console.log(this.selectedUser)
    this.userId = this.selectedUser.user_id
  }
  setPlanId() {
    console.log(this.selectedPlane)
    this.planId = this.selectedPlane.plan_id
  }

  setLicenseToRm(id: any) {
    this.licenseToRm = id;
  }

}
