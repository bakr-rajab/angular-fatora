import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';
import { Address, Branch } from '../models/branches/branch.model';
import { BranchService } from '../service-layer/branch.service';

declare function paggnation(): any;
declare function sidebarToggling(): any;

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branchesList!: Branch[]
  branchModel: Branch = {
    name_ar: '',
    name_en: '',
    code: '',
    invoiceSerial: 0,
    address: {
      country: '',
      governate: '',
      regionCity: '',
      street: '',
      buildingNumber: '',
      postalCode: '',
      floor: '',
      landmark: '',
      additionalInformation: '',
    } as Address,
  }

  initTable: boolean = false
  constructor(private apiCall: BranchService) { }

  ngOnInit(): void {
    // paggnation();
    sidebarToggling()
    this.getAllBranches()
  }

  getAllBranches() {

    this.apiCall.getAll().subscribe(res => {
      let ress = res
      this.branchesList = ress
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    })
  }

  editeBranch() {
    // this.editeReq = {
    //   "target": "branch",
    //   "action": "edite",
    //   "unique_value": {
    //     "branch_code": this.branchId
    //   },
    //   "branch_name_en": this.branchNameEn,
    //   "brnach_name_ar": this.branchNameAr,
    //   "user_id": sessionStorage.getItem('userId'),
    //   "account_branch_code": this.branchCode
    // }
    // this.apiCall.restServiceCall(this.editeReq).subscribe(res => {

    // })
    // this.getAllBranches()
  }

  setAndDeleteBranch(branch: any) {
    // this.deleteBranchReq = {
    //   "target": "branch",
    //   "action": "delete",
    //   "key": "branch_code",
    //   "value": branch.branch_code,
    //   "user_id": sessionStorage.getItem('userId')
    // }
    // this.apiCall.restServiceCall(this.deleteBranchReq).subscribe(res => {

    // })
    // this.getAllBranches()
  }
  AddBranch() {
    this.apiCall.create(this.branchModel).subscribe(res => {

      console.log("bbbb", res);
    })

  }
  setBranchToEdite(branch: any) {
    // this.branchId = branch.branch_code
    // this.branchNameAr = branch.brnach_name_ar
    // this.branchNameEn = branch.branch_name_en

  }

}
