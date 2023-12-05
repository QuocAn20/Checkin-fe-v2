import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBankingModalComponent } from './service-banking-modal.component';

describe('ServiceBankingModalComponent', () => {
  let component: ServiceBankingModalComponent;
  let fixture: ComponentFixture<ServiceBankingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceBankingModalComponent]
    });
    fixture = TestBed.createComponent(ServiceBankingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
