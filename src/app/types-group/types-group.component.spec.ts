import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesGroupComponent } from './types-group.component';

describe('TypesGroupComponent', () => {
  let component: TypesGroupComponent;
  let fixture: ComponentFixture<TypesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
