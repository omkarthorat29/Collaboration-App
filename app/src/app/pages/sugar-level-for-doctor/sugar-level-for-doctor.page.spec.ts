import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SugarLevelForDoctorPage } from './sugar-level-for-doctor.page';

describe('SugarLevelForDoctorPage', () => {
  let component: SugarLevelForDoctorPage;
  let fixture: ComponentFixture<SugarLevelForDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugarLevelForDoctorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SugarLevelForDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
