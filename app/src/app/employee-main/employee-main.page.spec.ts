import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeeMainPage } from './employee-main.page';

describe('EmployeeMainPage', () => {
  let component: EmployeeMainPage;
  let fixture: ComponentFixture<EmployeeMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
