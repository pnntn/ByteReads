import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookdetailComponentComponent } from './bookdetail-component.component';

describe('BookdetailComponentComponent', () => {
  let component: BookdetailComponentComponent;
  let fixture: ComponentFixture<BookdetailComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookdetailComponentComponent]
    });
    fixture = TestBed.createComponent(BookdetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
