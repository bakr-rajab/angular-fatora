import { Component, OnInit } from '@angular/core';

declare function paggnation():any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-accepted-invoices',
  templateUrl: './accepted-invoices.component.html',
  styleUrls: ['./accepted-invoices.component.css']
})
export class AcceptedInvoicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    paggnation();
    sidebarToggling();
  }

}
