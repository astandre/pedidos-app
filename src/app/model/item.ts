import {Producto} from './producto';

export class Item {
  producto: Producto;
  nombre: string;
  cantidad: number;
  subtotal: number;
  precio: number;
  especificacion: string;
  llevar: boolean;

  constructor() {
    this.llevar = false;
    this.cantidad = 0;
    this.especificacion = '';

  }

  toJson() {
    if (this.especificacion.length > 0) {
      return {
        id_producto: this.producto.id_producto,
        cantidad: this.cantidad,
        especificacion: this.especificacion,
        llevar: this.llevar
      };
    } else {
      return {
        id_producto: this.producto.id_producto,
        cantidad: this.cantidad,
        llevar: this.llevar
      };
    }

  }
}
