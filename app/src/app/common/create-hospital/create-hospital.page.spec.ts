import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateHospitalPage } from './create-hospital.page';

describe('CreateHospitalPage', () => {
  let component: CreateHospitalPage;
  let fixture: ComponentFixture<CreateHospitalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHospitalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHospitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
