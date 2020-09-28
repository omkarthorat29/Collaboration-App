import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotVerifiedPage } from './not-verified.page';

describe('NotVerifiedPage', () => {
  let component: NotVerifiedPage;
  let fixture: ComponentFixture<NotVerifiedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotVerifiedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotVerifiedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
