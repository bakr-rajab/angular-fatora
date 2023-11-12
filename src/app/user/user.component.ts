import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../service-layer/users.service';
import { User } from '../models/user/auth-user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../models/roles/roles.model';
import { RoleService } from '../service-layer/roles.service';
import { CompanyService } from '../service-layer/company.service';
import { Company } from '../models/company/company.model';
import { Branch } from '../models/branches/branch.model';
import { BranchService } from '../service-layer/branch.service';
import * as moment from 'moment';
// import * as moment from 'moment';
declare function paggnation(): any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = new User();
  roleList!: Role[];
  selectedRole!: any;
  selectedCompany!: any;
  selectedBranch!: any;
  companysList!: Array<Company>;
  branchList!: Branch[];
  usersRes: any;
  usersList!: User[];
  initTable: boolean = false;

  constructor(
    private apiCall: UserService,
    private roleService: RoleService,
    private companyService: CompanyService,
    private branchService: BranchService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.user = new User();
    sidebarToggling();
    this.getAllUser();
    //   this.getActivityCodes()
  }

  createUser() {
    this.apiCall.createUser(this.user).subscribe((res) => {
      this.usersList.push(res);
    });
  }
  dateDiff(end: string) {
    return moment(end).diff(moment(), 'day') + 1;
  }
  getAllUser() {
    this.apiCall.getAllUsers().subscribe((res) => {
      this.usersRes = res;
      this.usersList = this.usersRes;
      console.log(this.usersList);

      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    });
  }

  updateUser() {
    this.user.branch = this.selectedBranch;
    this.user.company = this.selectedCompany;
    this.user.role = this.selectedRole;
    console.log('44', this.user);
    return this.apiCall.updateUser(this.user.id, this.user).subscribe((res) => {
      console.log(res);
      if (res.affected == 1) {
        this.getAllUser();
      }
    });
  }

  deleteUser(id: string) {
    this.apiCall.deleteUser(id).subscribe((res) => {
      console.log(res);
      this.cd.detectChanges();
      if (res.affected == 1) {
        this.usersList = this.usersList.filter((item: any) => item.id != id);
        console.log(this.usersList);
      }
    });
    this.cd.detectChanges();
  }

  setUserData(user: User) {
    this.user = user;
    this.selectedCompany = user.company.id;
    this.selectedBranch = user.branch.id;
    this.selectedRole = user.role.id;
  }
  getRoles() {
    this.roleService.getRoles().subscribe((roles) => {
      this.roleList = roles;
    });
  }

  getCompanys() {
    this.companyService.getAll().subscribe((comp) => {
      console.log(comp);

      this.companysList = comp;
    });
  }

  getBranches() {
    this.branchService.getAll().subscribe((br) => {
      this.branchList = br;
    });
  }
}
