import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalesInvoiceComponent } from './add-sales-invoice/add-sales-invoice.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ClientsGuard } from './clientGaurd';
import { ClientsComponent } from './clients/clients.component';

import { HomeComponent } from './home/home.component';
import { LicenseComponent } from './license/license.component';
import { LoginComponent } from './login/login.component';
import { TypesGroupComponent } from './types-group/types-group.component';
import { ItemComponent } from './items/items.component';
import { UserGuard } from './user.guard';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { CompanyComponent } from './company/company.component';
import { BranchesComponent } from './address/branches.component';
import { AddressComponent } from './branches/address.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
 
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'branches',
    component: BranchesComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [ClientsGuard],
  },
  
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [ClientsGuard],
  },
  {
    path: 'license',
    component: LicenseComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'roles',
    component: RoleComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [UserGuard],
  },  
  {
    path: 'addSalesInvoice',
    component: AddSalesInvoiceComponent,
    canActivate: [ClientsGuard],
  },
 
  {
    path: 'items',
    component: ItemComponent,
    canActivate: [ClientsGuard],
  },
  {
    path: 'groups',
    component: TypesGroupComponent,
    canActivate: [ClientsGuard],
  },
 
 
  {
    path: 'home',
    component: HomeComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
