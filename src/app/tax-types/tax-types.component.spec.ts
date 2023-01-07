import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTypesComponent } from './tax-types.component';

describe('TaxTypesComponent', () => {
  let component: TaxTypesComponent;
  let fixture: ComponentFixture<TaxTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
