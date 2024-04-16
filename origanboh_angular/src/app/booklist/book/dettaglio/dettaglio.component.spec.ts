import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioComponent } from './dettaglio.component';

describe('DettaglioComponent', () => {
  let component: DettaglioComponent;
  let fixture: ComponentFixture<DettaglioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettaglioComponent]
    });
    fixture = TestBed.createComponent(DettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
