import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionBoxModalComponent } from './suggestion-box-modal.component';

describe('SuggestionBoxModalComponent', () => {
  let component: SuggestionBoxModalComponent;
  let fixture: ComponentFixture<SuggestionBoxModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionBoxModalComponent]
    });
    fixture = TestBed.createComponent(SuggestionBoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
