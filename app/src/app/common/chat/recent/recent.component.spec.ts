import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentComponent } from './recent.component';

describe('RecentComponent', () => {
  let component: RecentComponent;
  let fixture: ComponentFixture<RecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
