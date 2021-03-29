import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListOfProductPage } from './list-of-product.page';

describe('ListOfProductPage', () => {
  let component: ListOfProductPage;
  let fixture: ComponentFixture<ListOfProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
