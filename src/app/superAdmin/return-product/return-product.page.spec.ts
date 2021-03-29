import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReturnProductPage } from './return-product.page';

describe('ReturnProductPage', () => {
  let component: ReturnProductPage;
  let fixture: ComponentFixture<ReturnProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
