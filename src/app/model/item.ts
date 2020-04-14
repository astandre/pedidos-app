import {Producto} from './producto';

export class Item {
  id_item: number;
  producto: Producto;
  id_producto: string;
  id_pedido: number;
  pedido: string;
  mesa_str: string;
  nombre: string;
  cantidad: number;
  private _subtotal: number;
  precio: number;
  especificacion: string;
  llevar: boolean;

  constructor() {
    this.llevar = false;
    this.cantidad = 0;
    this.especificacion = '';

  }


  get subtotal(): number {
    if ('producto' in this) {
      return this.producto.precio * this.cantidad;
    } else {
      return this.precio * this.cantidad;
    }

  }

  toJson() {
    return {
      id_producto: this.producto.id_producto,
      cantidad: this.cantidad,
      especificacion: this.especificacion,
      llevar: this.llevar
    };
  }
}
