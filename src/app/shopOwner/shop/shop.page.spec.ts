import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPageOwner } from './shop.page';

describe('ShopPage', () => {
  let component: ShopPageOwner;
  let fixture: ComponentFixture<ShopPageOwner>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPageOwner ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPageOwner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
