import { LocalStorageService } from './../service-layer/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { EnumRoles } from '../models/roles/roles.model';

@Component({
  selector: 'app-common-side-nav',
  templateUrl: './common-side-nav.component.html',
  styleUrls: ['./common-side-nav.component.css'],
})
export class CommonSideNavComponent implements OnInit {
  public showSuperAdminPriv: boolean = false;
  public showAdminPriv: boolean = false;
  public showClientPriv: boolean = false;
  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    if (this.localStorage.getItem('userRole') == EnumRoles.SUPERADMIN) {
      this.showSuperAdminPriv = true;
      this.showAdminPriv = false;
      this.showClientPriv = false;
    } else if (this.localStorage.getItem('userRole') == EnumRoles.ADMIN) {
      this.showAdminPriv = true;
      this.showClientPriv = false;
      this.showSuperAdminPriv = false;
    } else if (this.localStorage.getItem('userRole') == EnumRoles.USER) {
      this.showClientPriv = true;
      this.showSuperAdminPriv = false;
      this.showAdminPriv = false;
    }
  }
}
