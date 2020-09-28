import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSugarPage } from './add-sugar.page';

describe('AddSugarPage', () => {
  let component: AddSugarPage;
  let fixture: ComponentFixture<AddSugarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSugarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
