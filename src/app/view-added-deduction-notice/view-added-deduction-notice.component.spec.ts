import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddedDeductionNoticeComponent } from './view-added-deduction-notice.component';

describe('ViewAddedDeductionNoticeComponent', () => {
  let component: ViewAddedDeductionNoticeComponent;
  let fixture: ComponentFixture<ViewAddedDeductionNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAddedDeductionNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddedDeductionNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
