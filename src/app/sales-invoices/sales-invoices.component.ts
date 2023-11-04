import { Component, OnInit } from '@angular/core';
// import { GenericService } from '../service-layer/generic.service';

declare function paggnation():any;
declare function sidebarToggling(): any;

@Component({
  selector: 'app-sales-invoices',
  templateUrl: './sales-invoices.component.html',
  styleUrls: ['./sales-invoices.component.css']
})
export class SalesInvoicesComponent implements OnInit {

  getAllEnvoicesReq:any
  envoicesRes:any
  envoicesList:any
  initTable:boolean = false

  constructor() { }

  ngOnInit(): void {
    sidebarToggling();
    this.getAllEnvoices()
  }

  getAllEnvoices(){
    // this.getAllEnvoicesReq={
    //   "target":"invoice",
    //   "action":"get_all_invoices",
    //   "user_id":sessionStorage.getItem('userId')
    //   }
    //   this.apiCall.restServiceCall(this.getAllEnvoicesReq).subscribe(res =>{ 
    //     this.envoicesRes = res
    //     this.envoicesList = this.envoicesRes.data
    //     if(this.initTable== false){
    //       paggnation();
    //       this.initTable = true;
    //     }
    //   })
  }

 
}
