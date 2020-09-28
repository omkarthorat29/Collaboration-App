import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForwardPage } from './forward.page';

describe('ForwardPage', () => {
  let component: ForwardPage;
  let fixture: ComponentFixture<ForwardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForwardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
