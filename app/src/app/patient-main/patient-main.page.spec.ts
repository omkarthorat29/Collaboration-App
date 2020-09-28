import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientMainPage } from './patient-main.page';

describe('PatientMainPage', () => {
  let component: PatientMainPage;
  let fixture: ComponentFixture<PatientMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
