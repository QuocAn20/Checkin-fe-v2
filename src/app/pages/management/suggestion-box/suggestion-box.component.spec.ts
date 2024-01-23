import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionBoxComponent } from './suggestion-box.component';

describe('SuggestionBoxComponent', () => {
  let component: SuggestionBoxComponent;
  let fixture: ComponentFixture<SuggestionBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionBoxComponent]
    });
    fixture = TestBed.createComponent(SuggestionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
