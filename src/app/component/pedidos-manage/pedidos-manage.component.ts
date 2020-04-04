import {Component, OnInit} from '@angular/core';
import {Mesa} from '../../model/mesa';
import {PedidosHandlerService} from '../../services/pedidos-handler.service';
import {Categoria} from '../../model/categoria';
import {Producto} from '../../model/producto';
import {Item} from '../../model/item';
import {Pedido} from '../../model/pedido';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-pedidos-manage',
  templateUrl: './pedidos-manage.component.html',
  styleUrls: ['./pedidos-manage.component.css']
})
export class PedidosManageComponent implements OnInit {

  categorias: Array<Categoria>;
  mesas: Array<Mesa>;
  newItemAux: Item;
  itemsForm;
  llevarPedidoForm;
  editIndex: number;
  pedido: Pedido;
  prevPedidoObj: Pedido;


  constructor(private pedidosHandlerService: PedidosHandlerService,
              private formBuilder: FormBuilder, private router: Router,
              private route: ActivatedRoute) {

    this.editIndex = null;
    this.pedido = new Pedido();
    this.itemsForm = this.formBuilder.group({
      cantidad: 0,
      especificacion: '',
      llevar: false,
    });
    this.llevarPedidoForm = this.formBuilder.group({
      llevar: false,
    });
  }

  newItem(newItem: Producto) {
    this.newItemAux = new Item();
    this.newItemAux.producto = newItem;
    if (this.pedido.llevar) {
      this.newItemAux.llevar = true;
    }
  }

  addItem(data) {
    // console.log('addItem ', data);

    if (this.newItemAux.cantidad > 0) {
      if (this.editIndex != null) {
        this.pedido.items[this.editIndex] = this.newItemAux;
      } else {
        this.pedido.items.push(this.newItemAux);
      }
      this.editIndex = null;
      // this.itemsForm.reset();
    }
    this.newItemAux = null;
  }

  addOneItem() {
    this.newItemAux.cantidad += 1;
  }

  lessOneItem() {
    if (this.newItemAux.cantidad > 0) {
      this.newItemAux.cantidad -= 1;
    }
  }


  deleteItem(index: number) {
    this.pedido.items.splice(index, 1);
  }

  editItem(index: number) {
    this.newItemAux = this.pedido.items[index];
    this.editIndex = index;
  }


  deletePedido() {
    this.pedido.items = [];
    this.prevPedidoObj = null;
  }

  sendPedido() {
    let sendOk = false;
    if (this.pedido.items.length > 0) {
      if (this.pedido.llevar) {
        sendOk = true;
      } else if (this.pedido.mesa != null) {
        sendOk = true;
      }
    }
    if (sendOk) {
      // this.pedido.mesa = this.currentMesa;
      // this.pedido.items = this.items;
      this.pedidosHandlerService.postPedido(this.pedido)
        .subscribe(data => {
            console.log('sendPedido ', data);
            this.router.navigate(['/pedidos']);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      console.log('Pedido vacio');
    }
  }

  findMesa(idMesa) {
    for (const mesaIter of this.mesas) {
      if (mesaIter['id_mesa'] === idMesa) {
        return mesaIter;
      }
    }
  }

  findProd(idProd) {
    for (const catIter of this.categorias) {
      for (const prodIter of catIter.productos) {
        // console.log('curretItem ', itemIter);
        // console.log('prod  ', prodIter);
        if (prodIter['id_producto'] === idProd) {
          return prodIter;
        }
      }
    }
  }

  getInitialData() {
    return forkJoin([
      this.pedidosHandlerService.getAllProductos(),
      this.pedidosHandlerService.getAllMesas()
    ]);
  }

  ngOnInit() {
    // Getting data for pedido edit
    this.route.paramMap.subscribe(params => {
      const idPedido = +params.get('idPedido');
      if (idPedido !== 0) {
        // console.log('Get pedido', idPedido);
        this.getInitialData().subscribe(data => {
          // console.log(data);
          this.categorias = data[0];
          this.mesas = data[1];
          this.pedidosHandlerService.getPedido(idPedido).subscribe(pedidoData => {
              // console.log('raw pedido', data);
              this.pedido = pedidoData;
              // Finding mesa OBJ
              this.pedido.mesa = this.findMesa(this.pedido.id_mesa);
              // Finding items OBJ
              for (const itemIter of this.pedido.items) {
                itemIter.producto = this.findProd(itemIter.id_producto);
              }
              console.log('final pedido', this.pedido);
            },
            error => {
              console.log(error);
            }
          );
        });

      } else {
        console.log('Setting new pedido');
        this.getInitialData().subscribe(data => {
          // console.log(data);
          this.categorias = data[0];
          this.mesas = data[1];
        });

      }
    });
  }

}
