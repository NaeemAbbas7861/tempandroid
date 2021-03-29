import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReturnprodcutPage } from './editprodcut.page';

describe('ReturnprodcutPage', () => {
  let component: ReturnprodcutPage;
  let fixture: ComponentFixture<ReturnprodcutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnprodcutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnprodcutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
