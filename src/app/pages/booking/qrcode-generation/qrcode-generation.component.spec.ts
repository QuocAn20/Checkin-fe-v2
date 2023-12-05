import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeGenerationComponent } from './qrcode-generation.component';

describe('QrcodeGenerationComponent', () => {
  let component: QrcodeGenerationComponent;
  let fixture: ComponentFixture<QrcodeGenerationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrcodeGenerationComponent]
    });
    fixture = TestBed.createComponent(QrcodeGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
