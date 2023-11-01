import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';


declare function paggnation():any;
declare function sidebarToggling(): any
@Component({
  selector: 'app-tax-types',
  templateUrl: './tax-types.component.html',
  // styleUrls: ['./tax-types.component.css']
})
export class TaxTypesComponent implements OnInit {
  taxTypeReq:any
  taxTypesRes:any
  taxTypesData:any
  initTable:boolean = false;
  constructor(private apiCall: GenericService) { }

  ngOnInit(): void {
    
    sidebarToggling();
    this.getTaxTypes()
  }

  getTaxTypes(){
    this.taxTypeReq={
      "target":"static",
      "action":"get_all_elements",
      "table_name":"tax_types"
      }
      this.apiCall.restServiceCall(this.taxTypeReq).subscribe(res =>{ 
        this.taxTypesRes = res
        this.taxTypesData = this.taxTypesRes.data
        if(this.initTable== false){
          paggnation();
          this.initTable = true;
        } 
      })
  }
}
