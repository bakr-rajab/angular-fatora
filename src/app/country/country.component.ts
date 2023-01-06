import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';


declare function paggnation():any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countriesReq:any
  countriesRes:any
  countriesData:any
  initTable:boolean=false
  constructor(private apiCall: GenericService) { }

  ngOnInit(): void {
    
    sidebarToggling()
    this.getCountries()
  }

  getCountries(){
    this.countriesReq={
      "target":"static",
      "action":"get_all_elements",
      "table_name":"countries"
      }
      this.apiCall.restServiceCall(this.countriesReq).subscribe(res =>{ 
        this.countriesRes = res
        this.countriesData = this.countriesRes.data
        if(this.initTable== false){
          paggnation();
          this.initTable = true;
        } 
      })
  }
}
