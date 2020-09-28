import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageZoomComponent } from './image-zoom.component';

describe('ImageZoomComponent', () => {
  let component: ImageZoomComponent;
  let fixture: ComponentFixture<ImageZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageZoomComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
