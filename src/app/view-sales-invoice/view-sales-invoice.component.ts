import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../service-layer/generic.service';


declare function paggnation(): any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-view-sales-invoice',
  templateUrl: './view-sales-invoice.component.html',
  styleUrls: ['./view-sales-invoice.component.css']
})
export class ViewSalesInvoiceComponent implements OnInit {

  getAllEnvoicesReq: any
  envoicesRes: any
  envoicesList: any
  initTable: boolean = false
  deleteEnvoiceReq: any
  editeEnvoiceReq: any
  exportFileReuest: any
  showDownLoadLink = false;
  expoerRes: any
  errorMsg = false
  dateTo = ""
  dateFrom = ""
  constructor(private apiCall: GenericService, private router: Router) { }

  ngOnInit(): void {
    // this.exportInvoice()
    sidebarToggling();
    // this.getAllEnvoices()
  }

  getAllEnvoices() {
    this.getAllEnvoicesReq = {
      "target": "invoice",
      "action": "get_all_invoices",
      "user_id": sessionStorage.getItem('userId')
    }
    this.apiCall.restServiceCall(this.getAllEnvoicesReq).subscribe(res => {
      this.envoicesRes = res
      this.envoicesList = this.envoicesRes.data
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    })
  }

  deleteEnvoice(envoice: any) {
    this.deleteEnvoiceReq = {
      "target": "invoice",
      "action": "delete",
      "key": "invoice_code",
      "value": envoice.invoice_code
    }
    this.apiCall.restServiceCall(this.deleteEnvoiceReq).subscribe(res => {

    })
    this.getAllEnvoices()
  }
  setEnvoiceToEdite(envocie: any) {
    sessionStorage.setItem('envoiceCode', envocie.invoice_code);
    console.log(envocie.invoice_code)
    sessionStorage.setItem('routeBack', '/salesInvoice')
    this.router.navigate(['/editeEnvoice']);
  }

  exportInvoice() {
    this.exportFileReuest = {
      "target": "invoice",
      "action": "export_invoice_report",
      "invoice_report_type": "general",
      "start_date": this.dateFrom,
      "end_date": this.dateTo,
      "file_path": "/home/accountantnlu/the_accountant/data_output/",
      "user_id": "c2a0c6abc57140be87f6d7a9ae187db9"
    }
    this.apiCall.restServiceCall(this.exportFileReuest).subscribe(res => {
      this.expoerRes = res;

      if (this.expoerRes.status == true) {
        this.showDownLoadLink = true
        this.download(this.expoerRes.data.file_paht)
      } else if (this.expoerRes.status == "False") {
        this.errorMsg = true;
      }

    })
  }

  download(url: any) {
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
