import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';
import { GroupService } from '../service-layer/group.service';
import { Group } from '../models/group.model';


declare function paggnation(): any;
declare function sidebarToggling(): any
@Component({
  selector: 'app-types-group',
  templateUrl: './types-group.component.html',
  styleUrls: ['./types-group.component.css']
})
export class TypesGroupComponent implements OnInit {
  groupsList: Group[] = [];
  groupModel: Group = {
    name: "",
    code: ""
  };
  initTable: boolean = false

  constructor(private apiCall: GroupService) { }

  ngOnInit(): void {

    sidebarToggling();
    this.getAllTypeGroup()
  }

  getAllTypeGroup() {

    this.apiCall.getAll().subscribe(res => {
      this.groupsList = res
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    })
  }

  addTypeGroup() {
    this.apiCall.create(this.groupModel).subscribe(res => {
      this.groupsList = [...this.groupsList, res];
    })
  }

  delete(id: any) {
    console.log(id);

    this.apiCall.delete(id).subscribe(res => {
      console.log({ res });

      if (res.affected == 1) {
        this.groupsList = this.groupsList.filter((item: any) => item.id != id);
        console.log(this.groupsList);

      }
    })
  }

  update(type: any) {

  }


}
