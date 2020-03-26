export class Producto {
  idProducto: string;
  nombre: string;
  descripcion: string;
  disponible: boolean;
  precio: number;

  // categoria: string;


  constructor(idProducto: string, nombre: string, descripcion: string, disponible: boolean, precio: number) {
    this.idProducto = idProducto;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.disponible = disponible;
    this.precio = precio;
  }
}
