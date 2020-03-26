import {Producto} from './producto';

export class Categoria {
  idCategoria: string;
  nombre: string;
  productos: Array<Producto>;


  constructor(idCategoria: string, nombre: string, productos: Array<Producto>) {
    this.idCategoria = idCategoria;
    this.nombre = nombre;
    this.productos = productos;
  }
}
