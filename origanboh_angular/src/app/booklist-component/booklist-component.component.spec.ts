import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistComponentComponent } from './booklist-component.component';

describe('BooklistComponentComponent', () => {
  let component: BooklistComponentComponent;
  let fixture: ComponentFixture<BooklistComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooklistComponentComponent]
    });
    fixture = TestBed.createComponent(BooklistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
