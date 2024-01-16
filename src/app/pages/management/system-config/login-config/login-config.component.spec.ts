import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConfigComponent } from './login-config.component';

describe('LoginConfigComponent', () => {
  let component: LoginConfigComponent;
  let fixture: ComponentFixture<LoginConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginConfigComponent]
    });
    fixture = TestBed.createComponent(LoginConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
