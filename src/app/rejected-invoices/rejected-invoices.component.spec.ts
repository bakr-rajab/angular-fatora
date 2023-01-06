import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedInvoicesComponent } from './rejected-invoices.component';

describe('RejectedInvoicesComponent', () => {
  let component: RejectedInvoicesComponent;
  let fixture: ComponentFixture<RejectedInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
