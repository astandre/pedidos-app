import {Component, OnInit} from '@angular/core';
import {PedidosHandlerService} from '../../services/pedidos-handler.service';
import {Pedido} from '../../model/pedido';

@Component({
  selector: 'app-caja-manage',
  templateUrl: './caja-manage.component.html',
  styleUrls: ['./caja-manage.component.css']
})
export class CajaManageComponent implements OnInit {

  pedidos: Array<Pedido> = [];

  constructor(private pedidosHandlerService: PedidosHandlerService) {
  }

  ngOnInit() {
    this.pedidosHandlerService.getPedidosEstado('A').subscribe(data => {
        console.log(data);
        this.pedidos = data;
      },
      error => {
        console.log(error);
      });
  }

}
