import { Component, OnInit } from '@angular/core';
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
  id!: string;
  userDat: any
  roleList!: Role[];
  companysList!: Company[];

  public clientModel = new SelectClient();
  getUserModel: any
  usersRes: any
  usersList!: any;
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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = new User();
    //   sidebarToggling()
    this.getAllUser()
    //   this.getActivityCodes()
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


  getUser() {
    this.id = this.route.snapshot.params['id'];

    this.apiCall.getUser(this.id).subscribe(res => {
      console.log(res)
    })
  }

  updateUser() {
    this.id = this.route.snapshot.params['id'];
    return this.apiCall.updateUser(this.id, this.user).subscribe(res => {
      console.log(res)
      this.usersList.unshift(res)
    })
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

  createUser() {
    console.log(this.user.role)
    this.user.branchId = "1"
    this.user.activity = "1"
    this.apiCall.createUser(this.user).subscribe(res => {
      console.log(res)
      // this.usersList = [...this.usersList, res]//sss
      this.usersList.push(res)
    })
  }

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

  setTaxNo(user: any) {
    //   //this.selectedTaxNo = user.tax_number
    //   this.phoneNo = user.ph_number
    //   this.email = user.email
    //   this.taxNo = user.tax_number
    //   this.selectedCode = user.activity_code
    //   this.userName = user.name
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

