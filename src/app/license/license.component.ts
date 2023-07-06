import { License } from './../models/license/license.model';
import { Component, OnInit } from '@angular/core';
import { GetPrograms } from '../models/programs/getPrograms';
import { CompanyService } from '../service-layer/company.service';
import { LicenseService } from '../service-layer/license.service';

declare function paggnation(): any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  licenseList!: License[]
  licenseModel: License = {
    companyId: "",
    endDate: new Date()
  }
  usersRes: any
  companyList: any
  response: any;

  programsModel: GetPrograms = new GetPrograms;
  plans: any
  rmLicenseModel: any
  initTable: boolean = false
  constructor(private licenseSer: LicenseService, private companySer: CompanyService) { }


  ngOnInit(): void {
    this.licenseModel.companyId = "اختر الشركه"
    sidebarToggling();
    this.getAllLicense()
  }

  getAllLicense() {
    this.licenseSer.getAll().subscribe(license => {
      this.response = license;
      this.licenseList = this.response
    })
  }

  getCompanys() {
    this.companySer.getAll().subscribe(res => {
      this.response = res
      this.companyList = this.response;
    })
  }

  getAllPlans() {
    this.programsModel.target = "plan"
    this.programsModel.action = "get_all_plans"
    // this.apiCall.restServiceCall(this.programsModel).subscribe(res => {
    //   this.response = res;
    //   this.plans = this.response.data;
    // })
  }
  addLicense() {

    const body = {
      companyId: this.licenseModel.companyId,
      endDate: this.licenseModel.endDate,
      startDate: new Date()
    }
    this.licenseSer.create(body).subscribe(data => {
      if (data) {
        this.response = data;
        this.licenseList = [...this.licenseList, this.response];
      }
    })

  }

  rmLicense(id: any) {
    this.rmLicenseModel = {
      "target": "license",
      "action": "delete",
      "key": "license_id",
      "value": id
    }
    // this.apiCall.restServiceCall(this.rmLicenseModel).subscribe(res => {
    // })
    this.getAllLicense()
  }
  setUserId() {
    // console.log(this.selectedUser)
    // this.userId = this.selectedUser.user_id
  }
  setPlanId() {
    // console.log(this.selectedPlane)
    // this.planId = this.selectedPlane.plan_id
  }

  setLicenseToRm(id: any) {
    // this.licenseToRm = id;
  }

}
