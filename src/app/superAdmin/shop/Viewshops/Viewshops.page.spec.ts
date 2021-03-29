import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewshops } from './Viewshops.page';

describe('ApprovedPage', () => {
  let component: Viewshops;
  let fixture: ComponentFixture<Viewshops>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Viewshops ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Viewshops);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
