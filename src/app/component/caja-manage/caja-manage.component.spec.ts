import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaManageComponent } from './caja-manage.component';

describe('CajaManageComponent', () => {
  let component: CajaManageComponent;
  let fixture: ComponentFixture<CajaManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
