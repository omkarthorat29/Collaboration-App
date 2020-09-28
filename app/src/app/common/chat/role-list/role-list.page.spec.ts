import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoleListPage } from './role-list.page';

describe('RoleListPage', () => {
  let component: RoleListPage;
  let fixture: ComponentFixture<RoleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
