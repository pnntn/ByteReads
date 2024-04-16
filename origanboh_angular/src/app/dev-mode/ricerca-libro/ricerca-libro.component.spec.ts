import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaLibroComponent } from './ricerca-libro.component';

describe('RicercaLibroComponent', () => {
  let component: RicercaLibroComponent;
  let fixture: ComponentFixture<RicercaLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RicercaLibroComponent]
    });
    fixture = TestBed.createComponent(RicercaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
