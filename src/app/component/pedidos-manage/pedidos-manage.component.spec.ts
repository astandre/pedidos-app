import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosManageComponent } from './pedidos-manage.component';

describe('PedidosManageComponent', () => {
  let component: PedidosManageComponent;
  let fixture: ComponentFixture<PedidosManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
