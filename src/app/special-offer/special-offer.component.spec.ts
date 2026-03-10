import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOfferComponent } from './special-offer.component';

describe('SpecialOffer', () => {
  let component: SpecialOfferComponent;
  let fixture: ComponentFixture<SpecialOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialOfferComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
