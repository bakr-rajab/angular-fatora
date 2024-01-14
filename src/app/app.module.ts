import { MatDatepickerModule } from '@angular/material/datepicker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericService } from './service-layer/generic.service';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
// import { AcceptedInvoicesComponent } from './accepted-invoices/accepted-invoices.component';
// import { DemoComponent } from './demo/demo.component';
import { ClientsComponent } from './clients/clients.component';
import { CountryComponent } from './country/country.component';
// import { AddNoticeComponent } from './add-notice/add-notice.component';
// import { AddDeductionNoticeComponent } from './add-deduction-notice/add-deduction-notice.component';
import { CommonSideNavComponent } from './common-side-nav/common-side-nav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
// import { LicenseComponent } from './license/license.component';
import { ViewAddedNoticeComponent } from './view-added-notice/view-added-notice.component';
import { ViewAddedDeductionNoticeComponent } from './view-added-deduction-notice/view-added-deduction-notice.component';
import { ViewSalesInvoiceComponent } from './view-sales-invoice/view-sales-invoice.component';
import { AddSalesInvoiceComponent } from './add-sales-invoice/add-sales-invoice.component';
import { SendInvoiceComponent } from './send-invoice/send-invoice.component';
import { TaxTypesComponent } from './tax-types/tax-types.component';
import { ItemComponent } from './items/items.component';
import { TypesGroupComponent } from './types-group/types-group.component';
import { UnitsComponent } from './units/units.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { SalesInvoicesComponent } from './sales-invoices/sales-invoices.component';
import { EditeEnvoiceComponent } from './edite-envoice/edite-envoice.component';
import { CommanHeaderComponent } from './comman-header/comman-header.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { RoleComponent } from './role/role.component';
import { CompanyComponent } from './company/company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';
import { BranchesComponent } from './address/branches.component';
import { AddressComponent } from './branches/address.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    // AcceptedInvoicesComponent,
    // DemoComponent,
    BranchesComponent,
    ClientsComponent,
    CountryComponent,
    // AddNoticeComponent,
    // AddDeductionNoticeComponent,
    CommonSideNavComponent,
    AnalyticsComponent,
    // LicenseComponent,
    ViewAddedNoticeComponent,
    ViewAddedDeductionNoticeComponent,
    ViewSalesInvoiceComponent,
    // RejectedInvoicesComponent,
    AddSalesInvoiceComponent,
    SendInvoiceComponent,
    TaxTypesComponent,
    ItemComponent,
    TypesGroupComponent,
    UnitsComponent,
    SalesInvoicesComponent,
    EditeEnvoiceComponent,
    CommanHeaderComponent,
    EditUserComponent,
    FileUploadComponent,
    RoleComponent,
    CompanyComponent,
    AddressComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    NgxMatSelectSearchModule,
    MatTableModule, // <-- Added Table Module
    MatPaginatorModule, // <-- Added Paginator Module
    MatProgressBarModule, // <-- Added Loader Module
    MatTooltipModule,
    MatCheckboxModule
  ],
  // providers: [GenericService],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
