import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddedNoticeComponent } from './view-added-notice.component';

describe('ViewAddedNoticeComponent', () => {
  let component: ViewAddedNoticeComponent;
  let fixture: ComponentFixture<ViewAddedNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAddedNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddedNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
