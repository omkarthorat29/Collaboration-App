import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PateintPage } from './pateint.page';

describe('PateintPage', () => {
  let component: PateintPage;
  let fixture: ComponentFixture<PateintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PateintPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PateintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
