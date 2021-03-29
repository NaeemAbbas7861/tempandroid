import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPageOwner } from './order.page';

describe('OrderPage', () => {
  let component: OrderPageOwner;
  let fixture: ComponentFixture<OrderPageOwner>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPageOwner ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPageOwner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
