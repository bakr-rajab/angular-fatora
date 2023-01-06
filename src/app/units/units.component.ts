import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';


declare function paggnation():any;
declare function sidebarToggling(): any
@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})

export class UnitsComponent implements OnInit {
  getUnitsReq:any
  unitsRes:any
  unitData:any
  initTable:boolean = false;
  constructor(private apiCall: GenericService) { }

  ngOnInit(): void {
    //paggnation();
    sidebarToggling();
    this.getUnits();
  }

  getUnits(){
    this.getUnitsReq={
      "target":"static",
      "action":"get_all_elements",
      "table_name":"measurement_units"
      }
      this.apiCall.restServiceCall(this.getUnitsReq).subscribe(res =>{ 
        this.unitsRes = res
        this.unitData = this.unitsRes.data
        if(this.initTable== false){
          paggnation();
          this.initTable = true;
        }
      })
     
  }
}
