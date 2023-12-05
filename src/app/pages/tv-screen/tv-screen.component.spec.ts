import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvScreenComponent } from './tv-screen.component';

describe('TvScreenComponent', () => {
  let component: TvScreenComponent;
  let fixture: ComponentFixture<TvScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvScreenComponent]
    });
    fixture = TestBed.createComponent(TvScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
