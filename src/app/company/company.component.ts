import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Company } from '../models/company/company.model';
import { CompanyService } from '../service-layer/company.service';
import { StaticService } from '../service-layer/static.service';

declare function sidebarToggling(): any;
declare function paggnation(): any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  activityList: any[] = [];

  companyModel: Company = new Company();
  activityId!: string;
  companyList: any;
  response: any;
  initTable: boolean = false;
  constructor(
    private staticSer: StaticService,
    private apiCall: CompanyService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    sidebarToggling();
    this.getAll();
  }

  getAll() {
    this.apiCall.getAll().subscribe((res) => {
      this.response = res;
      this.companyList = this.response;
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    });
  }

  deleteCompany(id: string) {
    this.apiCall.deleteCompany(id).subscribe((res) => {
      console.log(res);
      this.cd.detectChanges();
      if (res.affected == 1) {
        this.companyList = this.companyList.filter(
          (item: any) => item.id != id
        );
        console.log(this.companyList);
      }
    });
    this.cd.detectChanges();
  }

  addCompany() {
    console.log(this.companyModel);
    this.apiCall.createCompany(this.companyModel).subscribe((res) => {
      if (res) this.companyList = [...this.companyList, res];
    });
  }
  setToEdit(company: Company) {
    this.activityId = company.activity?.id;
    delete company.branch;
    delete company.license;
    this.companyModel = company;
    console.log('777777777777777', this.companyModel);
  }
  getActiviteis() {
    this.staticSer.getActivity().subscribe((act) => {
      this.activityList = act;
    });
  }
  edit() {
    this.companyModel.activity = this.activityId;
    console.log(this.companyModel);
    const { id, ...reset } = this.companyModel;
    this.apiCall.edit(id, reset).subscribe((res) => {
      console.log(res);
      if (res.affected == 1) {
        this.getAll();
      }
    });
  }

  resetForm() {
    this.companyModel = new Company();
  }
}
