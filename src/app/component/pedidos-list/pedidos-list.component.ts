import {Component, OnInit} from '@angular/core';
import {PedidosHandlerService} from '../../services/pedidos-handler.service';
import {Pedido} from '../../model/pedido';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {

  pedidos: Array<Pedido> = [];
  pedidosActual: Array<Pedido> = [];
  pedidosTodos: Array<Pedido> = [];
  display = true;

  constructor(private pedidosHandlerService: PedidosHandlerService, private router: Router) {
  }

  verDetallePedido(idPedido) {
    this.router.navigate(['/pedido', idPedido]);
  }

  nuevoPedido() {
    this.router.navigate(['/pedido']);
  }

  displayActuales() {
    this.display = true;
    this.pedidos = this.pedidosActual;
  }

  displayTodos() {
    this.display = false;
    this.pedidos = this.pedidosTodos;
  }

  finalizarPedido(currentPedido) {
    console.log(currentPedido);
    this.pedidosHandlerService.postChangePedido(currentPedido.id_pedido, 'S').subscribe(data => {
        // console.log(data);
        console.log('Entregado');
        for (const pedidoIter of this.pedidos) {
          if (pedidoIter.id_pedido === currentPedido.id_pedido) {
            const index = this.pedidos.indexOf(pedidoIter, 0);
            this.pedidos.splice(index, 1);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  detelePedido(idPedido) {
    this.pedidosHandlerService.deletePedido(idPedido).subscribe(data => {
        // console.log(data);
        console.log('Borrado');
        for (const pedidoIter of this.pedidos) {
          if (pedidoIter.id_pedido === idPedido) {
            const index = this.pedidos.indexOf(pedidoIter, 0);
            this.pedidos.splice(index, 1);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.pedidosHandlerService.getPedidosPrep().subscribe(data => {
        // console.log(data);
        this.pedidosActual = data;
        this.pedidos = data;
      },
      error => {
        console.log(error);
      });

    this.pedidosHandlerService.getPedidosEstado('A').subscribe(data => {
        // console.log(data);
        this.pedidosTodos = data;
      },
      error => {
        console.log(error);
      });
  }

}
