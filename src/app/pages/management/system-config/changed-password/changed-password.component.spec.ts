import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedPasswordComponent } from './changed-password.component';

describe('ChangedPasswordComponent', () => {
  let component: ChangedPasswordComponent;
  let fixture: ComponentFixture<ChangedPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangedPasswordComponent]
    });
    fixture = TestBed.createComponent(ChangedPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
