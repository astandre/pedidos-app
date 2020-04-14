import {Component, OnInit} from '@angular/core';
import {PedidosHandlerService} from '../../services/pedidos-handler.service';
import {Pedido} from '../../model/pedido';
import {Router} from '@angular/router';
import {Item} from '../../model/item';

@Component({
  selector: 'app-caja-manage',
  templateUrl: './caja-manage.component.html',
  styleUrls: ['./caja-manage.component.css']
})
export class CajaManageComponent implements OnInit {

  pedidos: Array<Pedido> = [];
  currentPedido: Pedido;
  auxCuenta: Pedido;
  split = false;

  constructor(private pedidosHandlerService: PedidosHandlerService, private router: Router) {
  }


  setCurrentPedido(pedido: Pedido) {
    console.log(pedido);
    this.currentPedido = pedido;
  }

  verDetallePedido(idPedido) {
    this.router.navigate(['/pedido', idPedido]);
  }


  splitCuenta() {
    if (this.split === true) {
      this.split = false;
    } else {
      this.auxCuenta = new Pedido();
      this.auxCuenta.codigo = this.currentPedido.codigo;
      this.auxCuenta.items = [];
      this.split = true;
    }

  }

  updateItems(item: Item, items: Array<Item>, mode: number) {
    // Mode 0 for reducing
    // Mode 1 for pushing
    let found = false;
    for (const itemIter of items) {
      if (itemIter.id_item === item.id_item) {
        found = true;
        const index = items.indexOf(itemIter, 0);
        if (mode === 0) {
          if (items[index].cantidad > 0) {
            items[index].cantidad -= 1;
          }
          // if (items[index].cantidad === 0) {
          //   console.log('Deleting item from array');
          //   items.splice(index, 1);
          // }
        } else {
          if (items[index].cantidad > 0) {
            items[index].cantidad += 1;
          }
          // else {
          //   item.cantidad = 1;
          //   items.push(item);
          // }
        }
      }
    }

    return [items, found];
  }

  passItemToAux(item: Item) {
    console.log('Passing item to aux');
    // let found;
    // found = this.updateItems(item, this.currentPedido.items, 0);
    // this.currentPedido.items = found[0];
    // found = this.updateItems(item, this.auxCuenta.items, 1);
    // if (!found[1]) {
    //   item.cantidad = 1;
    //   this.auxCuenta.items.push(item);
    // } else {
    //   this.auxCuenta.items = found[0];
    // }
    // console.log(this.auxCuenta);

  }

  passItemToMain(item: Item) {
    console.log('Passing item to main');
    // let found;
    // found = this.updateItems(item, this.auxCuenta.items, 0);
    // this.auxCuenta.items = found[0];
    // found = this.updateItems(item, this.currentPedido.items, 1);
    // if (!found[1]) {
    //   item.cantidad = 1;
    //   this.currentPedido.items.push(item);
    // } else {
    //   this.currentPedido = found[0];
    // }

  }

  finalizarPedido() {
    this.pedidosHandlerService.postChangePedido(this.currentPedido.id_pedido, 'G').subscribe(data => {
        // console.log(data);
        console.log('Finalizado');
        for (const pedidoIter of this.pedidos) {
          if (pedidoIter.id_pedido === this.currentPedido.id_pedido) {
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
    this.pedidosHandlerService.getPedidosEstado('A').subscribe(data => {
        console.log(data);
        this.pedidos = data;
      },
      error => {
        console.log(error);
      });
    this.currentPedido = new Pedido();
  }

}
