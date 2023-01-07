import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';


declare function paggnation():any;
declare function sidebarToggling(): any
@Component({
  selector: 'app-types-group',
  templateUrl: './types-group.component.html',
  styleUrls: ['./types-group.component.css']
})
export class TypesGroupComponent implements OnInit {
  getAllTypeGroupReq:any
  typeGroupsRes:any
  typeGroupsList:any
  i:any
  typeGroupAr:any
  typeGroupEn:any
  addTypeGroupReq:any
  initTable:boolean = false
  arabicName:any
  englishName:any
  selectedType:any
  deleteTypeReq:any
  editeTypeReq:any
  constructor(private apiCall: GenericService) { }

  ngOnInit(): void {
    
    sidebarToggling();
    this.getAllTypeGroup()
  }

  getAllTypeGroup(){
    this.getAllTypeGroupReq={
      "target":"type_group",
      "action":"get_all_types_groups",
      "user_id":sessionStorage.getItem('userId')
      }
      this.apiCall.restServiceCall(this.getAllTypeGroupReq).subscribe(res =>{ 
        this.typeGroupsRes = res
        this.typeGroupsList = this.typeGroupsRes.data
        if(this.initTable== false){
          paggnation();
          this.initTable = true;
        } 
      })
  }

  addTypeGroup(){
    this.addTypeGroupReq={
      "target":"type_group",
      "action":"create",
      "group_name_ar": this.typeGroupAr,
      "group_name_en": this.typeGroupEn,
      "user_id":sessionStorage.getItem('userId')
      }
      this.apiCall.restServiceCall(this.addTypeGroupReq).subscribe(res =>{ 
      })
      this.getAllTypeGroup()
  }

  setTypeToEdite(type:any){
    this.selectedType = type.group_code
    this.arabicName= type.group_name_ar
    this.englishName= type.group_name_en
  }

  setAndDeleteType(type:any){
    this.deleteTypeReq={
      "target":"type_group",
      "action":"delete",
      "key":"group_code",
      "value":type.group_code,
      "user_id":sessionStorage.getItem("userId")
      }
      this.apiCall.restServiceCall(this.deleteTypeReq).subscribe(res =>{ 
      })
      this.getAllTypeGroup()
  }

  editTypeGroup(){
    this.editeTypeReq={
      "target":"type_group",
      
      "action":"edit",
      "unique_value":{
          "group_code":this.selectedType
      },
      "group_name_ar": this.arabicName,
      "group_name_en": this.englishName
      }
      this.apiCall.restServiceCall(this.editeTypeReq).subscribe(res =>{ 
      })
      this.getAllTypeGroup()
  }
 
}
