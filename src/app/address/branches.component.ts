import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Branch } from '../models/branches/branch.model';
import { BranchService } from '../service-layer/branch.service';
import { Address } from '../models/address.model';
import { StaticService } from '../service-layer/static.service';
import { AddressService } from '../service-layer/adress.service';
import { CompanyService } from '../service-layer/company.service';

declare function paggnation(): any;
declare function sidebarToggling(): any;

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
  branchesList!: Branch[];
  branchModel = new Branch();
  addressList!: Address[];
  companyList!: any[];
  initTable: boolean = false;
  selectAddress!: any;
  selectCompany!: any;
  constructor(
    private apiCall: BranchService,
    private addressSer: AddressService,
    private companySer: CompanyService
  ) {}

  ngOnInit(): void {
    // paggnation();
    sidebarToggling();
    this.getAllBranches();
    console.log(
      '=======================bbbbbbbbbbbbbbbbbbbbbbbbbbb============='
    );
  }

  getAddresses() {
    this.addressSer.getAll().subscribe((com) => {
      this.addressList = com;
    });
  }
  getCompanies() {
    this.companySer.getAll().subscribe((con) => {
      this.companyList = con;
    });
  }

  getAllBranches() {
    this.apiCall.getAll().subscribe((res) => {
      this.branchesList = res;
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    });
  }

  AddBranch() {
    // this.addressModel.branchId = this.branchModel.id;
    // this.branchModel.address = this.addressModel;
    console.log('addd', this.branchModel);
    this.apiCall.create(this.branchModel).subscribe((res) => {
      this.branchesList.push(res);
    });
  }

  setBranchToEdite(branch: any) {
    console.log('====================================');
    console.log(branch);
    console.log('====================================');
    this.branchModel = branch;
    this.selectAddress = branch.address?.id;
    this.selectCompany = branch.company?.id;
  }

  UpdateBranch() {
    this.branchModel.address = this.selectAddress;
    this.branchModel.company = this.selectCompany;
    console.log(this.branchModel);
    this.apiCall.update(this.branchModel).subscribe((res) => {
      if (res.affected) this.getAllBranches();
    });
  }

  delete(id: string) {
    this.apiCall.delete(id).subscribe((res) => {
      if (res.affected === 1)
        this.branchesList = this.branchesList.filter((br) => br.id != id);
    });
  }
}
