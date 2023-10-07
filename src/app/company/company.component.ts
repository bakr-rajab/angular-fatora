import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Company } from '../models/company/company.model';
import { CompanyService } from '../service-layer/company.service';
import { StaticService } from '../service-layer/static.service';
import { SnackbarService } from '../snackbar.service';

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
    private cd: ChangeDetectorRef,
    private snackbar: SnackbarService
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
    this.areFieldsFilled()
      ? this.snackbar.openSnackBar('Please fill all fields', 3000, 'notif-fail')
      : this.apiCall.createCompany(this.companyModel).subscribe((res) => {
          if (res) {
            this.companyList = [...this.companyList, res];
            this.closeModal();
            this.resetForm();
          }
        });
  }
  closeModal() {
    document.getElementById('modalCreate')?.click();
  }

  setToEdit(company: Company) {
    this.activityId = company.activity?.id;
    delete company.branch;
    delete company.license;
    this.companyModel = company;
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
  areFieldsFilled(): boolean {
    const { name, taxNumber, activity, certificate, clientId, clientSecret1 } =
      this.companyModel;
    // Check if any of the required fields are empty
    if (
      !name ||
      !taxNumber ||
      !activity ||
      !certificate ||
      !clientId ||
      !clientSecret1
    ) {
      return true;
    }
    return false;
  }
}
