import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaClienteComponent } from './ricerca-cliente.component';

describe('RicercaUtenteComponent', () => {
  let component: RicercaClienteComponent;
  let fixture: ComponentFixture<RicercaClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RicercaClienteComponent]
    });
    fixture = TestBed.createComponent(RicercaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
