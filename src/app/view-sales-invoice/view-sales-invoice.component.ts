import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnvoiceService } from '../service-layer/envoice.service';
import { Envoice } from '../models/envoice.model';

declare function paggnation(): any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-view-sales-invoice',
  templateUrl: './view-sales-invoice.component.html',
  // styleUrls: ['./view-sales-invoice.component.css'],
})
export class ViewSalesInvoiceComponent implements OnInit {
  envoicesList: Array<any> = [];
  initTable: boolean = false;
  errorMsg = false;
  dateFrom = '';
  InvoiceStatus = ['fa-thumbs-o-down', 'fa-rocket', 'sent'];
  constructor(private apiCall: EnvoiceService, private router: Router) {}

  ngOnInit(): void {
    // this.exportInvoice()
    sidebarToggling();
    this.getAllEnvoices();
  }

  getAllEnvoices() {
    this.apiCall.getAll().subscribe((res) => {
      this.envoicesList = res;
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    });
  }

  deleteEnvoice(id: string) {
    this.apiCall.delete(id).subscribe((res) => {
      if (res.rowAffected) {
        // TODO:show notification
        this.getAllEnvoices();
      }
    });
  }
  setEnvoiceToEdite(envocie: any) {
    sessionStorage.setItem('envoiceCode', envocie.invoice_code);
    console.log(envocie.invoice_code);
    sessionStorage.setItem('routeBack', '/salesInvoice');
    this.router.navigate(['/editeEnvoice']);
  }
  send(id: string) {
    // call send method
    this.apiCall.send(id).subscribe((res) => {
      console.log(res);
    });
  }

  exportInvoice() {
   
  }

  download(url: any) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
