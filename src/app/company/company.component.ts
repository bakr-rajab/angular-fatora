import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Company } from '../models/company/company.model';
import { CompanyService } from '../service-layer/company.service';
import { ActivityService } from '../service-layer/static.service';

declare function sidebarToggling(): any;
declare function paggnation(): any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  activityList: any[] = [];

  companyModel: Company = {
    name: '',
    certificate: '',
    activity: ''
  }

  companyList: any
  response: any
  initTable: boolean = false
  constructor(private activitySer: ActivityService, private apiCall: CompanyService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    sidebarToggling();
    this.getAll();
  }

  getAll() {
    this.apiCall.getAll().subscribe(res => {
      this.response = res
      this.companyList = this.response;
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    })
  }

  deleteCompany(id: string) {
    this.apiCall.deleteCompany(id).subscribe(res => {
      console.log(res);
      this.cd.detectChanges()
      if (res.affected == 1) {
        this.companyList = this.companyList.filter((item: any) => item.id != id);
        console.log(this.companyList);
      }
    })
    this.cd.detectChanges()
  }

  addCompany() {
    console.log(this.companyModel.name);
    this.apiCall.createCompany(this.companyModel).subscribe(res => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      if (res)
        this.companyList = [...this.companyList, res];
    })
  }

  getActiviteis() {
    this.activitySer.getActivity().subscribe(act => {
      this.activityList = act
    })
  }
}
