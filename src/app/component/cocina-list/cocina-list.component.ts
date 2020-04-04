import {Component, OnInit} from '@angular/core';
import {Pedido} from '../../model/pedido';
import {PedidosHandlerService} from '../../services/pedidos-handler.service';
import {Item} from '../../model/item';


@Component({
  selector: 'app-cocina-list',
  templateUrl: './cocina-list.component.html',
  styleUrls: ['./cocina-list.component.css']
})
export class CocinaListComponent implements OnInit {

  pedidos: Array<Pedido> = [];
  itemsList: Array<Item> = [];
  display = true;

  constructor(private pedidosHandlerService: PedidosHandlerService) {
  }

  displayPedidos() {
    this.display = true;
  }

  displayItems() {
    this.display = false;
  }

  finalizarPedido(idPedido) {
    this.pedidosHandlerService.postChangePedido(idPedido, 'C').subscribe(data => {
        // console.log(data);
        console.log('Entregado');
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
    this.pedidosHandlerService.getPedidosEstado('P').subscribe(data => {
        // console.log(data);
        this.pedidos = data;
        this.pedidos.map(pedidoIter => {

          pedidoIter.items.map(itemIter => {
            itemIter.pedido = '#' + pedidoIter.codigo;
            if (pedidoIter.llevar) {
              itemIter.mesa_str = 'Llevar';
            } else {
              itemIter.mesa_str = pedidoIter.mesa_str;
            }

            this.itemsList.push(itemIter);
          });
        });
      },
      error => {
        console.log(error);
      });
  }

}
