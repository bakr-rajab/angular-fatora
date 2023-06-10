import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service-layer/roles.service';
import { Role } from '../models/roles/roles.model';
import { ChangeDetectorRef } from '@angular/core';

declare function sidebarToggling(): any;
declare function paggnation(): any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roleModel: Role = {
    name: ''
  }
  rolesList: any
  response: any
  initTable: boolean = false
  constructor(private apiCall: RoleService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    sidebarToggling();
    this.getAllRoles();

  }

  getAllRoles() {
    this.apiCall.getRoles().subscribe(res => {
      this.response = res
      this.rolesList = this.response;
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    })
  }
  deleteRole(id: string) {
    this.apiCall.deleteRole(id).subscribe(res => {
      console.log(res);
      // this.cd.detectChanges()
      if (res.affected == 1) {
        this.rolesList = this.rolesList.filter((item: any) => item.id != id);
        console.log(this.rolesList);

      }
    })
    // this.cd.detectChanges()

  }

  addRole() {
    console.log(this.roleModel.name);
    this.apiCall.createRole(this.roleModel).subscribe(res => {
      if (res)
        this.rolesList = [...this.rolesList, res];
    })
  }


}
