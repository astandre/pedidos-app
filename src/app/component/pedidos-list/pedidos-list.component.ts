import {Component, OnInit} from '@angular/core';
import {PedidosHandlerService} from '../../services/pedidos-handler.service';
import {Pedido} from '../../model/pedido';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {

  pedidos: Array<Pedido> = [];

  constructor(private pedidosHandlerService: PedidosHandlerService, private router: Router) {
    this.pedidosHandlerService.getAllPedidos().subscribe(data => {
        // console.log(data);
        this.pedidos = data;
      },
      error => {
        console.log(error);
      });
  }

  verDetallePedido(idPedido) {
    this.router.navigate(['/pedido', idPedido]);
  }

  nuevoPedido() {
    this.router.navigate(['/pedido']);
  }

  ngOnInit() {
  }

}
