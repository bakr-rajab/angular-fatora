import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedInvoicesComponent } from './accepted-invoices/accepted-invoices.component';
import { AddDeductionNoticeComponent } from './add-deduction-notice/add-deduction-notice.component';
import { AddNoticeComponent } from './add-notice/add-notice.component';
import { AddSalesInvoiceComponent } from './add-sales-invoice/add-sales-invoice.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { BranchesComponent } from './branches/branches.component';
import { ClientsGuard } from './clientGaurd';
import { ClientsComponent } from './clients/clients.component';
import { CountryComponent } from './country/country.component';
import { DemoComponent } from './demo/demo.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditeEnvoiceComponent } from './edite-envoice/edite-envoice.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LicenseComponent } from './license/license.component';
import { LoginComponent } from './login/login.component';
import { ProgramsComponent } from './programs/programs.component';
import { RejectedInvoicesComponent } from './rejected-invoices/rejected-invoices.component';
import { SalesInvoicesComponent } from './sales-invoices/sales-invoices.component';
import { SendInvoiceComponent } from './send-invoice/send-invoice.component';
import { TaxTypesComponent } from './tax-types/tax-types.component';
import { TypesGroupComponent } from './types-group/types-group.component';
import { TypesComponent } from './types/types.component';
import { UnitsComponent } from './units/units.component';
import { UserGuard } from './user.guard';
import { UserComponent } from './user/user.component';
import { ViewAddedDeductionNoticeComponent } from './view-added-deduction-notice/view-added-deduction-notice.component';
import { ViewAddedNoticeComponent } from './view-added-notice/view-added-notice.component';
import { ViewSalesInvoiceComponent } from './view-sales-invoice/view-sales-invoice.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate : [UserGuard]
  },
  {
    path: 'programs',
    component: ProgramsComponent,
    canActivate : [UserGuard]
  },
  {
    path: 'accepted-invoices',
    component: AcceptedInvoicesComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'branches',
    component: BranchesComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'country',
    component: CountryComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'add-Notice',
    component: AddNoticeComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'add-deduction-Notice',
    component: AddDeductionNoticeComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'license',
    component: LicenseComponent,
    canActivate : [UserGuard]
  },
  {
    path: 'viewAddedNotice',
    component: ViewAddedNoticeComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'viewAddeddDeductionNotice',
    component: ViewAddedDeductionNoticeComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'salesInvoice',
    component: ViewSalesInvoiceComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'rejectedInvoices',
    component: RejectedInvoicesComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'addSalesInvoice',
    component: AddSalesInvoiceComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'sendInvoice',
    component: SendInvoiceComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'taxTypes',
    component: TaxTypesComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'types',
    component: TypesComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'units',
    component: UnitsComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'typesGroup',
    component: TypesGroupComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'editeUser',
    component: EditUserComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'editeEnvoice',
    component: EditeEnvoiceComponent,
    canActivate: [ClientsGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
