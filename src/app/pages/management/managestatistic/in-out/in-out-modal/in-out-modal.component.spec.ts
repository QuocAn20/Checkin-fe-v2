import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutModalComponent } from './in-out-modal.component';

describe('InOutModalComponent', () => {
  let component: InOutModalComponent;
  let fixture: ComponentFixture<InOutModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InOutModalComponent]
    });
    fixture = TestBed.createComponent(InOutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
