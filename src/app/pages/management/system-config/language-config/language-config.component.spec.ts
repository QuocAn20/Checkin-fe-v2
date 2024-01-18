import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageConfigComponent } from './language-config.component';

describe('LanguageConfigComponent', () => {
  let component: LanguageConfigComponent;
  let fixture: ComponentFixture<LanguageConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageConfigComponent]
    });
    fixture = TestBed.createComponent(LanguageConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
