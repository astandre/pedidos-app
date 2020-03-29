import {Producto} from './producto';

export class Categoria {
  id_categoria: string;
  nombre: string;
  productos: Array<Producto>;


  constructor(id_categoria: string, nombre: string, productos: Array<Producto>) {
    this.id_categoria = id_categoria;
    this.nombre = nombre;
    this.productos = productos;
  }
}
