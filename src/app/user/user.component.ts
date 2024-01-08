import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from '../snackbar.service';
declare function sidebarToggling(): any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = new User();
  ELEMENT_DATA: User[] = [];
  isloading = false;
  totalRows = 0;
  pageSize = 10;
  cPage = 0;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'role',
    'company',
    'tax',
    'date',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource(this.ELEMENT_DATA);
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    roleList!: Role[];
    selectedRole!: any;
    selectedCompany!: any;
    selectedBranch!: any;
    companysList!: Array<Company>;
    branchList!: Branch[];
    
    constructor(
      private apiCall: UserService,
      private roleService: RoleService,
      private companyService: CompanyService,
      private branchService: BranchService,
      private cd: ChangeDetectorRef,
      private snackbarSer: SnackbarService
      ) {}
      ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  ngOnInit(): void {
    // this.user = new User();
    sidebarToggling();
    this.getAllUser();
    //   this.getActivityCodes()
  }
  toggleStatus(id: any, status: boolean) {
    this.isloading = true;
    this.apiCall.updateUser(id, { online: !status }).subscribe((data) => {
      console.log(data);
      if (data.affected === 1) {
        this.getAllUser();  
        this.snackbarSer.openSnackBar('تم تعديل الحالة بنجاح', 4000, 'success');
      }
      this.isloading = false;
    });

  }

  createUser() {
    this.apiCall.createUser(this.user).subscribe((res) => {
      this.dataSource.data.push(res);
      this.dataSource._updateChangeSubscription();
      this.snackbarSer.openSnackBar('تم الاضافة بنجاح', 4000, 'success');
    });
  }
  dateDiff(end: string) {
    return moment(end).diff(moment(), 'day') + 1;
  }
  getAllUser() {
    this.isloading = true;

    this.apiCall.getAllUsers(this.cPage + 1, this.pageSize).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.items);
      setTimeout(() => {
        this.paginator.pageIndex = res.meta.currentPage - 1;
        this.paginator.length = res.meta.totalItems;
        this.isloading = false;
      });
    });
  }
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.cPage = event.pageIndex;
    this.getAllUser();
  }

  updateUser() {
    this.user.branch = this.selectedBranch;
    this.user.company = this.selectedCompany;
    this.user.role = this.selectedRole;
   
    return this.apiCall.updateUser(this.user.id, this.user).subscribe((res) => {
      console.log(res);
      if (res.affected == 1) {
        this.getAllUser();
        // this.dataSource._updateChangeSubscription();
        this.snackbarSer.openSnackBar('تم التعديل بنجاح', 4000, 'success');
      }
    });
  }

  deleteUser(id: string) {
    this.apiCall.deleteUser(id).subscribe((res) => {
      console.log(res);
      this.cd.detectChanges();
      if (res.affected == 1) {
        this.dataSource.data = this.dataSource.data.filter((item: any) => item.id != id);
        this.snackbarSer.openSnackBar('تم الحذف بنجاح', 4000, 'success');
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
