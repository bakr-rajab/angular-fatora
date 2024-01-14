import { SnackbarService } from './../snackbar.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EnvoiceService } from '../service-layer/envoice.service';
import { Envoice } from '../models/envoice.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

declare function sidebarToggling(): any;
@Component({
  selector: 'app-view-sales-invoice',
  templateUrl: './view-sales-invoice.component.html',
  styleUrls: ['./view-sales-invoice.component.css'],
})
export class ViewSalesInvoiceComponent implements OnInit {
  envoicesList: Array<any> = [];
  isLoading = false;
  totaRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  displayedColumns: string[] = [
    'select',
    'internalId',
    'uuid',
    'createdAt',
    'branch',
    'client',
    'tax', //tacNumber
    'address',
    'total',
    'rate',
    'totalDiscound',
    'netTotal',
    'status',
    'actions',
    'download',
  ];

  calcTotalSales(line: any) {
    return line.reduce((acc: any, l: any) => acc + +l.salesTotal, 0);
  }

  calcNetTotal(line: any) {
    return line.reduce((acc: any, l: any) => acc + +l.netTotal, 0);
  }

  calcDiscoundRate(line: any) {
    return line.reduce((acc: any, l: any) => acc + +l.discoundRate, 0);
  }
  calcTotalDiscound(line: any) {
    return line.reduce((acc: any, l: any) => acc + +l.discount_amount, 0);
  }

  checkboxLabel(row: Envoice) {
    return 'select';
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
    //   +row.id + 1
    // }`;
  }

  selection = new SelectionModel<Envoice>(true, []);
  dataSource: MatTableDataSource<Envoice> = new MatTableDataSource(
    this.envoicesList
  );

  constructor(
    private cd: ChangeDetectorRef,
    private apiCall: EnvoiceService,
    private router: Router,
    private snack: SnackbarService
  ) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    sidebarToggling();
    this.getAllEnvoices();
  }

  getAllEnvoices() {
    this.isLoading = true;
    this.apiCall
      .getAll(this.currentPage + 1, this.pageSize)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.items);
        this.paginator.length = res.meta?.totalItems;
        this.cd.detectChanges();
        this.isLoading = false;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  setEnvoiceToEdite(envocie: any) {
    sessionStorage.setItem('envoiceCode', envocie.invoice_code);
    console.log(envocie.invoice_code);
    sessionStorage.setItem('routeBack', '/salesInvoice');
    this.router.navigate(['/editeEnvoice']);
  }

  async sendAll() {
    this.isLoading = true;
    for (let row of this.selection.selected) {
      try {
        let res = await this.apiCall.send(row.id).toPromise();
        if (res) {
          this.snack.openSnackBar(
            `تم ارسال الفاتورة  :${row.internalId}:بنجاح', 7000, 'success`
          );
          this.getAllEnvoices();
        } else {
          this.snack.openSnackBar(
            ` ${row.internalId} -حدث خطأ اثناء ارسال الفاتورة`,
            4000,
            'danger'
          );
        }
      } catch (error) {
        // handle error
      }
    }
    this.isLoading = false;
  }

  send(id: string) {
    // call send method
    this.isLoading = true;
    setTimeout(() => {
      this.apiCall.send(id).subscribe((res) => {
        if (res) {
          this.snack.openSnackBar('تم ارسال الفاتورة بنجاح', 4000, 'success');
          this.getAllEnvoices();
        } else {
          this.snack.openSnackBar(
            'حدث خطأ اثناء ارسال الفاتورة',
            400,
            'danger'
          );
        }
        this.isLoading = false;
      });
      this.isLoading = false;
    }, 1000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllEnvoices();
  }
  exportInvoice() {
    // this.exportFileReuest = {
    //   "target": "invoice",
    //   "action": "export_invoice_report",
    //   "invoice_report_type": "general",
    //   "start_date": this.dateFrom,
    //   "end_date": this.dateTo,
    //   "file_path": "/home/accountantnlu/the_accountant/data_output/",
    //   "user_id": "c2a0c6abc57140be87f6d7a9ae187db9"
    // }
    // this.apiCall.restServiceCall(this.exportFileReuest).subscribe(res => {
    //   this.expoerRes = res;
    //   if (this.expoerRes.status == true) {
    //     this.showDownLoadLink = true
    //     this.download(this.expoerRes.data.file_paht)
    //   } else if (this.expoerRes.status == "False") {
    //     this.errorMsg = true;
    //   }
    // })
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
