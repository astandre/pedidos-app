import {Producto} from './producto';

export class Item {


  producto: Producto;
  private _cantidad: number;
  private _especificacion: string;
  private _llevar: boolean;

  constructor(producto: Producto) {
    this.producto = producto;
    this._llevar = false;
    this._cantidad = 0;
  }

  get cantidad(): number {
    return this._cantidad;
  }

  get especificacion(): string {
    return this._especificacion;
  }

  get llevar(): boolean {
    return this._llevar;
  }


  set cantidad(value: number) {
    this._cantidad = value;
  }

  set llevar(value: boolean) {
    this._llevar = value;
  }

  set especificacion(value: string) {
    this._especificacion = value;
  }
}
