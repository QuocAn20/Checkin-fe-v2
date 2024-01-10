import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingScreenModalComponent } from './waiting-screen-modal.component';

describe('WaitingScreenModalComponent', () => {
  let component: WaitingScreenModalComponent;
  let fixture: ComponentFixture<WaitingScreenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingScreenModalComponent]
    });
    fixture = TestBed.createComponent(WaitingScreenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
