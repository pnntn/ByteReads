import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookdetailComponent } from './bookdetail.component';

describe('BookdetailComponent', () => {
  let component: BookdetailComponent;
  let fixture: ComponentFixture<BookdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookdetailComponent]
    });
    fixture = TestBed.createComponent(BookdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
