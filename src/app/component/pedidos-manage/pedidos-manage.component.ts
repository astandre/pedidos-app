import {Component, OnInit} from '@angular/core';
import {Mesa} from '../../model/mesa';
import {PedidosHandlerService} from '../../services/pedidos-handler.service';
import {Categoria} from '../../model/categoria';
import {Producto} from '../../model/producto';
import {Item} from '../../model/item';
import {Pedido} from '../../model/pedido';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pedidos-manage',
  templateUrl: './pedidos-manage.component.html',
  styleUrls: ['./pedidos-manage.component.css']
})
export class PedidosManageComponent implements OnInit {

  categorias: Array<Categoria>;
  mesas: Array<Mesa>;
  items: Array<Item> = [];
  newItemAux: Item;
  itemsForm;
  editIndex: number;
  pedido: Pedido;
  currentMesa: Mesa;
  prevPedidoObj: Pedido;


  constructor(private pedidosHandlerService: PedidosHandlerService, private formBuilder: FormBuilder, private router: Router) {
    this.pedidosHandlerService.getAllProductos().subscribe(data => {
        // console.log(data);
        this.categorias = data;
      },
      error => {
        console.log(error);
      });
    this.pedidosHandlerService.getAllMesas().subscribe(data => {
        // console.log(data);
        this.mesas = data;
      },
      error => {
        console.log(error);
      });

    this.editIndex = null;
    this.pedido = new Pedido();
    this.itemsForm = this.formBuilder.group({
      cantidad: 0,
      especificacion: '',
      llevar: false,
    });
  }

  newItem(newItem: Producto) {
    this.newItemAux = new Item();
    this.newItemAux.producto = newItem;
  }

  addItem(data) {
    // console.log('addItem ', data);

    if (this.newItemAux.cantidad > 0) {
      // this.newItemAux.llevar = data.llevar;
      // if (data.especificacion != null) {
      //   this.newItemAux.especificacion = data.especificacion;
      // } else {
      //   this.newItemAux.especificacion = '';
      // }
      if (this.editIndex != null) {
        this.items[this.editIndex] = this.newItemAux;
      } else {
        this.items.push(this.newItemAux);
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
    this.items.splice(index, 1);
  }

  editItem(index: number) {
    this.newItemAux = this.items[index];
    this.editIndex = index;
  }


  changeMesa(mesaValue) {
    this.currentMesa = this.mesas[mesaValue.target.value];
  }


  deletePedido() {
    this.pedido.items = [];
    this.items = [];
    this.prevPedidoObj = null;
  }

  prevPedido() {
    if (this.items.length > 0 && this.currentMesa != null) {
      this.pedido.mesa = this.currentMesa;
      this.pedido.items = this.items;
      console.log(this.pedido);
      this.pedidosHandlerService.postPrevPedido(this.pedido)
        .subscribe(data => {
            console.log('final ', data);
            this.prevPedidoObj = data;
          },
          error => {
            console.log(error);
          }
        );
    } else {
      console.log('Pedido vacio');
    }
  }

  sendPedido() {
    if (this.items.length > 0 && this.currentMesa != null) {
      this.pedido.mesa = this.currentMesa;
      this.pedido.items = this.items;
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

  ngOnInit() {
  }

}
