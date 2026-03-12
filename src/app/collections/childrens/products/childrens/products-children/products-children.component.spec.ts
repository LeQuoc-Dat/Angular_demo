import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsChildrenComponent } from './products-children.component';

describe('Collections', () => {
  let component: ProductsChildrenComponent;
  let fixture: ComponentFixture<ProductsChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsChildrenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsChildrenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
