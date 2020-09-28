import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageSendPage } from './image-send.page';

describe('ImageSendPage', () => {
  let component: ImageSendPage;
  let fixture: ComponentFixture<ImageSendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
