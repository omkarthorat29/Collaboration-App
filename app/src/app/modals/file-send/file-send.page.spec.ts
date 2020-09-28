import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FileSendPage } from './file-send.page';

describe('FileSendPage', () => {
  let component: FileSendPage;
  let fixture: ComponentFixture<FileSendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FileSendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
