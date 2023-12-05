import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBankingComponent } from './service-banking.component';

describe('ServiceBankingComponent', () => {
  let component: ServiceBankingComponent;
  let fixture: ComponentFixture<ServiceBankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceBankingComponent]
    });
    fixture = TestBed.createComponent(ServiceBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
