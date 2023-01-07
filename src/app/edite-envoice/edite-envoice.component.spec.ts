import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeEnvoiceComponent } from './edite-envoice.component';

describe('EditeEnvoiceComponent', () => {
  let component: EditeEnvoiceComponent;
  let fixture: ComponentFixture<EditeEnvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeEnvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeEnvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
