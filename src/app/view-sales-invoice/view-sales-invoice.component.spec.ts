import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesInvoiceComponent } from './view-sales-invoice.component';

describe('ViewSalesInvoiceComponent', () => {
  let component: ViewSalesInvoiceComponent;
  let fixture: ComponentFixture<ViewSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalesInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
