import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-side-nav',
  templateUrl: './common-side-nav.component.html',
  styleUrls: ['./common-side-nav.component.css']
})
export class CommonSideNavComponent implements OnInit {
  public showSuperAdminPriv: boolean = false;
  public showAdminPriv: boolean = false;
  public showClientPriv: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userRole') == 'superAdmin') {
      this.showSuperAdminPriv = true;
      this.showAdminPriv = false;
      this.showClientPriv = false;
    } else if (sessionStorage.getItem('userRole') == 'admin') {
      this.showAdminPriv = true;
      this.showClientPriv = false;
      this.showSuperAdminPriv = false;
    } else if (sessionStorage.getItem('userRole') == 'User') {
      this.showClientPriv = true;
      this.showSuperAdminPriv = false;
      this.showAdminPriv = false;
    }
  }
}
