import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermosDeUsoPage } from './termos-de-uso.page';

describe('TermosDeUsoPage', () => {
  let component: TermosDeUsoPage;
  let fixture: ComponentFixture<TermosDeUsoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermosDeUsoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermosDeUsoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
