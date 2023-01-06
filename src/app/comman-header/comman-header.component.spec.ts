import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanHeaderComponent } from './comman-header.component';

describe('CommanHeaderComponent', () => {
  let component: CommanHeaderComponent;
  let fixture: ComponentFixture<CommanHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommanHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
