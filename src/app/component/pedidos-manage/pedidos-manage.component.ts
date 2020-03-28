import {Component, OnInit} from '@angular/core';
import {Mesa} from '../../model/mesa';
import {PedidosHandlerService} from '../../services/pedidos-handler.service';
import {Categoria} from '../../model/categoria';
import {Producto} from '../../model/producto';
import {Item} from '../../model/item';
import {FormBuilder} from '@angular/forms';

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


  constructor(private pedidosHandlerService: PedidosHandlerService, private formBuilder: FormBuilder) {
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


    this.itemsForm = this.formBuilder.group({
      cantidad: 0,
      especificacion: '',
      llevar: false,
    });
  }

  newItem(newItem: Producto) {
    this.newItemAux = new Item(newItem);
  }

  addItem(data) {
    console.log(data);
    if (this.newItemAux.cantidad > 0) {
      this.newItemAux.llevar = data.llevar;
      this.newItemAux.especificacion = data.especificacion;
      this.items.push(this.newItemAux);
      this.itemsForm.reset();
    }
    // else if (data.cantidad > 0 && this.newItemAux.cantidad === 0) {
    //   this.newItemAux.llevar = data.llevar;
    //   this.newItemAux.especificacion = data.especificacion;
    //   this.newItemAux.cantidad = data.cantidad;
    //   this.items.push(this.newItemAux);
    //   this.itemsForm.reset();
    // }

    this.newItemAux = null;
  }

  // itemValueChanged(data) {
  //   this.newItemAux.cantidad = data.target.value;
  // fpr thtml
  // (change)="itemValueChanged($event)"
  // }

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


  ngOnInit() {
  }

}
