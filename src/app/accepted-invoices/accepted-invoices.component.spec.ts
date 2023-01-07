import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedInvoicesComponent } from './accepted-invoices.component';

describe('AcceptedInvoicesComponent', () => {
  let component: AcceptedInvoicesComponent;
  let fixture: ComponentFixture<AcceptedInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
