import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotsDetailsComponent } from './pilots-details.component';

describe('PilotsDetailsComponent', () => {
  let component: PilotsDetailsComponent;
  let fixture: ComponentFixture<PilotsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilotsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilotsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
