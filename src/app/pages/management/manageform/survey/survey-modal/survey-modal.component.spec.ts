import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyModalComponent } from './survey-modal.component';

describe('SurveyModalComponent', () => {
  let component: SurveyModalComponent;
  let fixture: ComponentFixture<SurveyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyModalComponent]
    });
    fixture = TestBed.createComponent(SurveyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
