import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalChatPage } from './personal-chat.page';

describe('PersonalChatPage', () => {
  let component: PersonalChatPage;
  let fixture: ComponentFixture<PersonalChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
