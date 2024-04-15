import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerareaComponent } from './customerarea.component';

describe('CustomerareaComponent', () => {
  let component: CustomerareaComponent;
  let fixture: ComponentFixture<CustomerareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerareaComponent]
    });
    fixture = TestBed.createComponent(CustomerareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
