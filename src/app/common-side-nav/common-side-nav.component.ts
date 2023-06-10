import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-side-nav',
  templateUrl: './common-side-nav.component.html',
  styleUrls: ['./common-side-nav.component.css']
})
export class CommonSideNavComponent implements OnInit {
  public showAdminPriv: boolean = false;
  public showClientPriv: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userRole') == 'superAdmin') {
      this.showAdminPriv = true;
      this.showClientPriv = false;
    } else if (sessionStorage.getItem('userRole') == 'user') {
      this.showClientPriv = true;
      this.showAdminPriv = false;
    }
  }

}
