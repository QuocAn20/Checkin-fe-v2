import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomModalComponent } from './room-modal.component';

describe('RoomModalComponent', () => {
  let component: RoomModalComponent;
  let fixture: ComponentFixture<RoomModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomModalComponent]
    });
    fixture = TestBed.createComponent(RoomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
