import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeductionNoticeComponent } from './add-deduction-notice.component';

describe('AddDeductionNoticeComponent', () => {
  let component: AddDeductionNoticeComponent;
  let fixture: ComponentFixture<AddDeductionNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeductionNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeductionNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
