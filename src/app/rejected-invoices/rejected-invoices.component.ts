import { Component, OnInit } from '@angular/core';

declare function paggnation():any;
declare function sidebarToggling(): any
@Component({
  selector: 'app-rejected-invoices',
  templateUrl: './rejected-invoices.component.html',
  styleUrls: ['./rejected-invoices.component.css']
})
export class RejectedInvoicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    paggnation();
    sidebarToggling();
  }

}
