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
  itemsAux: Array<Item> = [];

  constructor(private pedidosHandlerService: PedidosHandlerService, private router: Router) {
  }


  setCurrentPedido(pedido: Pedido) {
    // console.log(pedido);
    this.currentPedido = pedido;
  }

  verDetallePedido(idPedido) {
    this.router.navigate(['/pedido', idPedido]);
  }


  splitCuenta() {
    console.log(this.itemsAux);
    if (this.split === true) {
      this.split = false;
      if (this.itemsAux.length > 0) {
        this.currentPedido.items = this.itemsAux;
      }
    } else {
      this.auxCuenta = new Pedido();
      this.auxCuenta.codigo = this.currentPedido.codigo;
      this.auxCuenta.items = [];
      this.split = true;
    }

  }


  passItemToAux(item: Item) {
    // console.log('Passing item to aux');
    if (this.auxCuenta.items.length === 0) {
      this.currentPedido.items.forEach(itemIter => {
        const auxItem = new Item();
        auxItem.id_item = itemIter.id_item;
        auxItem.nombre = itemIter.nombre;
        auxItem.precio = itemIter.precio;
        auxItem.llevar = itemIter.llevar;
        auxItem.especificacion = itemIter.especificacion;
        auxItem.cantidad = itemIter.cantidad;
        this.itemsAux.push(auxItem);
      });
    }
    if (item.cantidad > 0) {
      const auxItem = new Item();
      auxItem.id_item = item.id_item;
      auxItem.nombre = item.nombre;
      auxItem.precio = item.precio;
      auxItem.llevar = item.llevar;
      item.cantidad -= 1;
      let found;
      for (const [index, itemIter] of this.auxCuenta.items.entries()) {
        if (itemIter.id_item === item.id_item) {
          found = true;
          if (this.auxCuenta.items[index].cantidad > 0) {
            this.auxCuenta.items[index].cantidad += 1;
          }
          break;
        }
      }
      if (!found) {
        auxItem.cantidad = 1;
        this.auxCuenta.items.push(auxItem);
      }
    }

  }

  passItemToMain(item: Item) {
    // console.log('Passing aux to main');
    item.cantidad -= 1;
    for (const [index, itemIter] of this.currentPedido.items.entries()) {
      if (itemIter.id_item === item.id_item) {
        this.currentPedido.items[index].cantidad += 1;
        break;
      }
    }
    if (item.cantidad === 0) {
      for (const [index, itemIter] of this.auxCuenta.items.entries()) {
        if (itemIter.id_item === item.id_item) {
          this.auxCuenta.items.splice(index, 1);
          break;
        }
      }
    }
  }

  finalizarPedido() {
    this.pedidosHandlerService
      .postChangePedido(this.currentPedido.id_pedido, 'G')
      .subscribe(data => {
          // console.log(data);
          console.log('Finalizado');
          for (const pedidoIter of this.pedidos) {
            if (pedidoIter.id_pedido === this.currentPedido.id_pedido) {
              const index = this.pedidos.indexOf(pedidoIter, 0);
              this.pedidos.splice(index, 1);
            }
          }
          this.currentPedido = new Pedido();
          this.auxCuenta = new Pedido();
          this.itemsAux = [];
          this.split = false;
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
        // console.log(data);
        this.pedidos = data;
      },
      error => {
        console.log(error);
      });
    this.currentPedido = new Pedido();
  }

}
