import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatUserListPage } from './chat-user-list.page';

describe('ChatUserListPage', () => {
  let component: ChatUserListPage;
  let fixture: ComponentFixture<ChatUserListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUserListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatUserListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
