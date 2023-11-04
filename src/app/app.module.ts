import { MatDatepickerModule } from '@angular/material/datepicker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { CommonSideNavComponent } from './common-side-nav/common-side-nav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LicenseComponent } from './license/license.component';
import { ViewSalesInvoiceComponent } from './view-sales-invoice/view-sales-invoice.component';
import { AddSalesInvoiceComponent } from './add-sales-invoice/add-sales-invoice.component';
import { ItemComponent } from './items/items.component';
import { TypesGroupComponent } from './types-group/types-group.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { SalesInvoicesComponent } from './sales-invoices/sales-invoices.component';
import { CommanHeaderComponent } from './comman-header/comman-header.component';
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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    BranchesComponent,
    ClientsComponent,
    CommonSideNavComponent,
    AnalyticsComponent,
    LicenseComponent,
    ViewSalesInvoiceComponent,
    AddSalesInvoiceComponent,
    ItemComponent,
    TypesGroupComponent,
    SalesInvoicesComponent,
    CommanHeaderComponent,
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
