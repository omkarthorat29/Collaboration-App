import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserVerifyPage } from './user-verify.page';

describe('UserVerifyPage', () => {
  let component: UserVerifyPage;
  let fixture: ComponentFixture<UserVerifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVerifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
