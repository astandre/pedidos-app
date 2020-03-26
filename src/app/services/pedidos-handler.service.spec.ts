import { TestBed } from '@angular/core/testing';

import { PedidosHandlerService } from './pedidos-handler.service';

describe('PedidosHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidosHandlerService = TestBed.get(PedidosHandlerService);
    expect(service).toBeTruthy();
  });
});
