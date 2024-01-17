import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingTimeComponent } from './working-time.component';

describe('WorkingTimeComponent', () => {
  let component: WorkingTimeComponent;
  let fixture: ComponentFixture<WorkingTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkingTimeComponent]
    });
    fixture = TestBed.createComponent(WorkingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
