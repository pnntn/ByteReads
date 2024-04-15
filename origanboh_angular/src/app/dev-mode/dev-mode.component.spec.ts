import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevModeComponent } from './dev-mode.component';

describe('DevModeComponent', () => {
  let component: DevModeComponent;
  let fixture: ComponentFixture<DevModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevModeComponent]
    });
    fixture = TestBed.createComponent(DevModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
