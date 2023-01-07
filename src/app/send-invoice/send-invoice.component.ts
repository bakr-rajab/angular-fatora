import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';


declare function paggnation():any;
declare function sidebarToggling(): any
@Component({
  selector: 'app-send-invoice',
  templateUrl: './send-invoice.component.html',
  styleUrls: ['./send-invoice.component.css']
})
export class SendInvoiceComponent implements OnInit {

  getAllEnvoicesReq:any
  submitEnvoiceReq:any
  envoicesRes:any
  envoicesList:any
  initTable:boolean = false
  envoiceToSent:Array<any> = []
  constructor(private apiCall: GenericService) { }

  ngOnInit(): void {
    sidebarToggling();
    this.getAllEnvoices();
  }

  getAllEnvoices(){
    this.getAllEnvoicesReq={
      "target":"invoice",
      "action":"get_integration_invoices",
      "user_id":sessionStorage.getItem('userId')
      }
      this.apiCall.restServiceCall(this.getAllEnvoicesReq).subscribe(res =>{ 
        this.envoicesRes = res
        this.envoicesList = this.envoicesRes.data
        if(this.initTable== false){
          paggnation();
          this.initTable = true;
        }
      })
  }

  fieldsChange(values:any, envoice:any):void {
    console.log(values.currentTarget.checked);
    if(values.currentTarget.checked == true){
      this.envoiceToSent.push(envoice.invoice_code);
    }else{
      this.envoiceToSent.forEach((element,index)=>{
        if(element==envoice.invoice_code) delete this.envoiceToSent[index];
     });
    }
    console.log(this.envoiceToSent)
  }
  sendEnvoice(){
    this.submitEnvoiceReq={
      "target":"invoice",
      "action":"send_invoices",
      "invoices_id":this.envoiceToSent,
      "user_id":sessionStorage.getItem('userId')
      }
      this.apiCall.restServiceCall(this.submitEnvoiceReq).subscribe(res =>{ 
      
      })
      this.sendEnvoice();
  }

}
