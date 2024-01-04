import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitModalComponent } from './unit-modal.component';

describe('UnitModalComponent', () => {
  let component: UnitModalComponent;
  let fixture: ComponentFixture<UnitModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitModalComponent]
    });
    fixture = TestBed.createComponent(UnitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
