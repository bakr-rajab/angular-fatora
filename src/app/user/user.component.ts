import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SelectClient } from '../models/client/select-client.model';
import { GenericService } from '../service-layer/generic.service';
import { UserService } from '../service-layer/users.service';
import { User } from '../models/user/auth-user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../models/roles/roles.model';
import { RoleService } from '../service-layer/roles.service';
import { CompanyService } from '../service-layer/company.service';
import { Company } from '../models/company/company.model';

declare function paggnation(): any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user!: User;
  id !: string;
  userDat: any
  valEditUser: any;
  roleList!: Role[];
  companysList!: Company[];

  public clientModel = new SelectClient();
  getUserModel: any
  usersRes: any
  usersList!: User[];
  codesRequest: any;
  codesRes: any
  codeList!: any;
  code!: string
  selectedCode: any
  createUserReq: any
  email: any
  secretNo: any
  taxNo: any
  pass: any
  phoneNo: any
  userName: any
  editeUserReq: any
  selectedTaxNo: any
  deleteModel: any
  initTable: boolean = false
  clientId: any
  clientSecret1: any
  clientSecret2: any
  constructor(private apiCall: UserService,
    private roleService: RoleService,
    private companyService: CompanyService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.user = new User();
    //   sidebarToggling()
    this.getAllUser()
    //   this.getActivityCodes()
  }

  createUser() {
    this.user.company = { id: this.user.companyId }
    console.log(this.user)
    this.apiCall.createUser(this.user).subscribe(res => {
      console.log(res)
      // this.usersList = [...this.usersList, res]//sss
      this.usersList.push(res)
    })
  }

  getAllUser() {
    this.apiCall.getAllUsers().subscribe(res => {
      console.log(res)
      this.usersRes = res
      this.usersList = this.usersRes
      console.log(this.usersList)

      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    })
  }

  getUser(id: any) {
    id = this.id
    this.apiCall.getUser(id).subscribe(res => {
      console.log(res)
    })
  }

  updateUser(id: string) {
    console.log('====================================');
    console.log("qqqq", this.user);
    console.log('====================================');
    return this.apiCall.updateUser(id, this.valEditUser).subscribe(res => {
      console.log(res)
      this.user = res
    })
  }

  deleteUser(id: string) {
    this.apiCall.deleteUser(id).subscribe(res => {
      console.log(res);
      this.cd.detectChanges()
      if (res.affected == 1) {
        this.usersList = this.usersList.filter((item: any) => item.id != id);
        console.log(this.usersList);
      }
    })
    this.cd.detectChanges()
  }

  // getActivityCodes() {
  //   this.codesRequest = {
  //     "target": "static",
  //     "action": "get_all_elements",
  //     "table_name": "commercial_activities"
  //   }

  //   this.apiCall.restServiceCall(this.codesRequest).subscribe(res => {
  //     this.codesRes = res
  //     this.codeList = this.codesRes.data;
  //   })
  // }

  // this.getAllUser()
  //   }

  editeUser() {
  }

  //     "name": this.userName,
  //     "ph_number": Number(this.phoneNo),
  //     "email": this.email,
  //     "activity_code": Number(this.code),
  //     "client_id": this.clientId,
  //     "client_secret_1": this.clientSecret1,
  //     "client_secret_2": this.clientSecret2
  //   }

  //   this.apiCall.restServiceCall(this.editeUserReq).subscribe(res => {
  //   })
  //   this.getAllUser()
  // }

  setUserTorm(id: any) {
    //   this.deleteModel = {
    //     "target": "user",
    //     "action": "delete",
    //     "key": "user_id",
    //     "value": id
  }

  //   this.apiCall.restServiceCall(this.deleteModel).subscribe(res => {
  //   })
  //   this.getAllUser()
  // }

  setcode() {
    //   this.code = this.selectedCode.code
    //   console.log(this.code);
  }

  setUserData(user: any) {
    console.log({ user })
    this.user.name = user.name;
    this.user.email = user.email;
    this.user.phone = user.phone;
    this.user.password = user.password;
    this.user.clientSecret1 = user.clientSecret1;
    this.user.clientSecret2 = user.clientSecret2;
    this.user.roleId = user.role.id;
    this.user.companyId = user.company.id;
    this.user.clientId = user.clientId;
    this.user.taxNumber = user.tax
  }

  resetAddModal() {
    //   this.userName = ""
    //   this.email = ""
    //   this.pass = ""
    //   this.taxNo = ""
    //   this.phoneNo = ""
    //   this.clientId = ""
    //   this.clientSecret1 = ""
    //   this.clientSecret2 = ""
    //   this.selectedCode = ""
  }

  getRoles() {
    this.roleService.getRoles().subscribe(roles => {
      console.log("111111", roles);

      this.roleList = roles
    })
  }

  getCompanys() {
    this.companyService.getAll().subscribe(comp => {
      console.log("111111", comp);

      this.companysList = comp
    })
  }
}
