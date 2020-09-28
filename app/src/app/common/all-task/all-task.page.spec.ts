import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllTaskPage } from './all-task.page';

describe('AllTaskPage', () => {
  let component: AllTaskPage;
  let fixture: ComponentFixture<AllTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
