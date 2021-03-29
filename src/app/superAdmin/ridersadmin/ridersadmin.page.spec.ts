import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidersAdminPage } from './ridersadmin.page';

describe('RidersAdminPage', () => {
  let component: RidersAdminPage;
  let fixture: ComponentFixture<RidersAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidersAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidersAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
