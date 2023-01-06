import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../service-layer/generic.service';


declare function paggnation():any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-view-added-notice',
  templateUrl: './view-added-notice.component.html',
  styleUrls: ['./view-added-notice.component.css']
})
export class ViewAddedNoticeComponent implements OnInit {

  getReportsReq:any
  getReportsRes:any
  reportsList:any
  deleteReportReq:any
  initTable:boolean = false
  reportCode:any
  getAllEnvoicesReq:any
  envoicesRes:any
  envoicesList:any
  constructor(private apiCall: GenericService,private router:Router) { }

  ngOnInit(): void {
   
    sidebarToggling()
    //this.getAllReports()
    this.getAllEnvoices()
  }

  // getAllReports(){
  //   this.getReportsReq={
  //     "target":"invoice_report",
  //     "action":"get_all_invoices_report",
  //     "user_id":sessionStorage.getItem('userId')
  //     }
  //     this.apiCall.restServiceCall(this.getReportsReq).subscribe(res =>{ 
  //       this.getReportsRes = res;
  //       this.reportsList = this.getReportsRes.data;
  //       if(this.initTable== false){
  //         paggnation();
  //         this.initTable = true;
  //       }
  //     })
  // }

  getAllEnvoices(){
    this.getAllEnvoicesReq={
      "target":"invoice",
      "action":"get_all_invoices",
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

  deleteEnvoiceReport(report:any){
    this.deleteReportReq={
      "target":"invoice",
      "action":"delete",
      "key":"invoice_code",
      "value":report.invoice_code
      }
      this.apiCall.restServiceCall(this.deleteReportReq).subscribe(res =>{ 
       
      })
      this.getAllEnvoices()
  }
  setEnvoiceToEdite(envocie:any){
    sessionStorage.setItem('envoiceCode', envocie.invoice_code);
    console.log(envocie.invoice_code)
    sessionStorage.setItem('routeBack', '/viewAddedNotice')
    this.router.navigate(['/editeEnvoice']);
  }
 
}
