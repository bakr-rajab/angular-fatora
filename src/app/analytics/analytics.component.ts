import { Component, OnInit } from '@angular/core';

declare function paggnation():any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    paggnation()
    sidebarToggling()
  }

}
