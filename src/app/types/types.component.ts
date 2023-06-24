import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';
import { Item } from '../models/item.model';
import { ItemService } from '../service-layer/item.service';
import { GroupService } from '../service-layer/group.service';


declare function paggnation(): any;
declare function sidebarToggling(): any
@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class ItemComponent implements OnInit {

  itemModel = new Item();
  itemList!: Item[];

  getAllTypesReq: any
  allTypesRes: any
  typesList: any
  i: any
  getAllTypeGroupReq: any
  typeGroupsRes: any
  typeGroupsList: any
  selectedTypeGroup: any
  typeGroupId: any
  getUnitsReq: any
  unitsRes: any
  unitData: any
  selectedUnit: any
  unitName: any
  taxTypeReq: any
  taxTypesRes: any
  taxTypesData: any
  selectedTaxType: any
  taxType: any
  optionVal: any
  taxPercent: any
  price: any
  typeName: any
  typeTaxCode: any
  typeCode: any
  createTypeReq: any
  initTable: boolean = false;
  deleteTypeReq: any
  editeTypeReq: any
  selectedType: any
  unit: any
  typeCodeOld: any
  uni_typeCode: any
  typeSymbol: any
  symbol: any
  symbols = [
    'EGS',
    'GS1'
  ]
  initSybol: any
  initTypeGroup: any
  initUnit: any
  initTaxType: any
  groupsList!: any[];
  constructor(private restCall: ItemService, private groupSer: GroupService) { }

  ngOnInit(): void {
    sidebarToggling();
    this.getAllItems()
  }

  getAllItems() {

    this.restCall.getAll().subscribe(res => {
      this.itemList = res
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }

    })
  }
  getGroups() {
    this.groupSer.getAll().subscribe(res => {
      this.groupsList = res
    })
  }

  getAllTypeGroup() {
    // this.getAllTypeGroupReq = {
    //   "target": "type_group",
    //   "action": "get_all_types_groups",
    //   "user_id": sessionStorage.getItem('userId')
    // }
    // this.restCall.restServiceCall(this.getAllTypeGroupReq).subscribe(res => {
    //   this.typeGroupsRes = res
    //   this.typeGroupsList = this.typeGroupsRes.data
    // })
  }

  getUnits() {
    this.getUnitsReq = {
      "target": "static",
      "action": "get_all_elements",
      "table_name": "measurement_units"
    }
    // this.restCall.restServiceCall(this.getUnitsReq).subscribe(res => {
    //   this.unitsRes = res
    //   this.unitData = this.unitsRes.data
    // })
  }

  getTaxTypes() {
    this.taxTypeReq = {
      "target": "static",
      "action": "get_all_elements",
      "table_name": "tax_types"
    }
    // this.restCall.restServiceCall(this.taxTypeReq).subscribe(res => {
    //   this.taxTypesRes = res
    //   this.taxTypesData = this.taxTypesRes.data
    // })
  }

  getAddTypesPre(action: any) {
    this.getAllTypeGroup()
    this.getUnits()
    this.getTaxTypes()
    console.log(this.optionVal)
    if (action == 'reset') {
      this.resetModal()
    }
  }

  createType() {
    this.createTypeReq = {
      "account_type_code": Number(this.typeCode),
      "type_name": this.typeName,
      "tax_code": this.typeTaxCode,
      "type_group": this.typeGroupId,
      "unit_of_measurment": this.unitName,
      "tax_type": this.taxType,
      "tax_percentage": Number(this.taxPercent),
      "price": Number(this.price),
      "user_id": sessionStorage.getItem('userId'),
      "tax_code_type": this.symbol
    }
    console.log(this.itemModel);

    // this.restCall.create(this.itemModel).subscribe(res => {
    //   console.log({ result: res });
    // })
    // this.getAllTypes()
  }

  setTypeGroup() {
    this.typeGroupId = this.selectedTypeGroup.group_code
    console.log(this.typeGroupId)
  }
  setUnit() {
    this.unitName = this.selectedUnit.desc_en
    console.log(this.unitName)
  }
  setTaxType() {
    this.taxType = this.selectedTaxType.code
    console.log(this.taxType)
  }

  setTypeToEdite(type: any) {
    this.selectedType = type.group_code
    this.typeCode = type.account_type_code
    this.typeTaxCode = type.tax_code
    this.typeName = type.type_name
    this.price = type.price
    this.taxPercent = type.tax_percentage
    this.unit = type.unit_of_measurment
    this.uni_typeCode = type.type_code

    // this.initSybol = type.tax_code_type
    // this.initTaxType = type.tax_code_type
    // this.initTypeGroup = type.unit_of_measurment
    this.getAddTypesPre('')
  }
  resetModal() {
    this.typeCode = ""
    this.typeTaxCode = ""
    this.typeName = ""
    this.price = ""
    this.taxPercent = ""
    this.typeSymbol = ""
  }
  setAndDeleteType(type: any) {
    this.deleteTypeReq = {
      "target": "type",
      "action": "delete",
      "key": "type_code",
      "value": type.type_code,
      "user_id": sessionStorage.getItem("userId")
    }
    // this.restCall.restServiceCall(this.deleteTypeReq).subscribe(res => {
    // })
    // this.getAllTypes()
  }

  editType() {
    this.editeTypeReq = {
      "target": "type",

      "action": "edit",
      "unique_value": {
        "type_code": this.uni_typeCode
      },
      "type_name": this.typeName,
      "tax_code": this.typeTaxCode,
      "type_group": this.typeGroupId,
      "unit_of_measurment": this.selectedUnit.desc_en,
      "tax_type": this.taxType,
      "tax_percentage": Number(this.taxPercent),
      "price": Number(this.price),
      "account_type_code": Number(this.typeCode),
      "tax_code_type": this.symbol,
      "user_id": sessionStorage.getItem("userId")
    }
    // this.restCall.restServiceCall(this.editeTypeReq).subscribe(res => {
    // })
    // this.getAllTypes()
  }

  setSymbol() {
    this.symbol = this.typeSymbol
  }
}
