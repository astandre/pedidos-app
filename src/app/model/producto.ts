export class Producto {
  id_producto: string;
  nombre: string;
  descripcion: string;
  disponible: boolean;
  precio: number;

  constructor(id_producto: string, nombre: string, descripcion: string, disponible: boolean, precio: number) {
    this.id_producto = id_producto;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.disponible = disponible;
    this.precio = precio;
  }
}
