import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSideNavComponent } from './common-side-nav.component';

describe('CommonSideNavComponent', () => {
  let component: CommonSideNavComponent;
  let fixture: ComponentFixture<CommonSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
