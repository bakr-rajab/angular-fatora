import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';
import { Branch } from '../models/branches/branch.model';
import { BranchService } from '../service-layer/branch.service';
import { CompanyService } from '../service-layer/company.service';
import { Company } from '../models/company/company.model';
import { Address } from '../models/address.model';
import { StaticService } from '../service-layer/static.service';

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
  addressModel = new Address();
  selectCompany!: any;
  companyList!: Company[];
  countries!: any[];
  initTable: boolean = false;
  constructor(
    private apiCall: BranchService,
    private companySer: CompanyService,
    private staticSer: StaticService
  ) {}

  ngOnInit(): void {
    // paggnation();
    sidebarToggling();
    this.getAllBranches();
  }

  getCompanies() {
    this.companySer.getAll().subscribe((com) => {
      this.companyList = com;
    });
  }
  getCountries() {
    this.staticSer.getCountries().subscribe((con) => {
      console.log(con);

      this.countries = con;
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

  editeBranch() {
    this.apiCall.update(this.branchModel).subscribe((res) => {
      console.log(res);
    });
  }

  AddBranch() {
    this.addressModel.branchId = this.branchModel.id;
    this.branchModel.address = this.addressModel;
    console.log('addd', this.branchModel);
    return;
    this.apiCall.create(this.branchModel).subscribe((res) => {
      this.branchesList.push(res);
    });
  }

  setBranchToEdite(branch: any) {
    console.log('====================================');
    console.log(branch);
    console.log('====================================');
  }

  delete(id: string) {
    this.apiCall.delete(id).subscribe((res) => {
      if (res.affected === 1)
        this.branchesList = this.branchesList.filter((br) => br.id != id);
    });
  }
}
