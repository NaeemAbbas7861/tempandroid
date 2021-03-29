import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageOwner } from './product.page';

describe('ShopPage', () => {
  let component: ProductPageOwner;
  let fixture: ComponentFixture<ProductPageOwner>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPageOwner ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageOwner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
