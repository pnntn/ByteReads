import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponentComponent } from './login-form-component.component';

describe('LoginFormComponentComponent', () => {
  let component: LoginFormComponentComponent;
  let fixture: ComponentFixture<LoginFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponentComponent]
    });
    fixture = TestBed.createComponent(LoginFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
