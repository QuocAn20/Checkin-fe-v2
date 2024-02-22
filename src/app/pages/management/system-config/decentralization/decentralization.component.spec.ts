import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecentralizationComponent } from './decentralization.component';

describe('DecentralizationComponent', () => {
  let component: DecentralizationComponent;
  let fixture: ComponentFixture<DecentralizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecentralizationComponent]
    });
    fixture = TestBed.createComponent(DecentralizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
