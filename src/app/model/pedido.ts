import {Mesa} from './mesa';
import {Item} from './item';

export class Pedido {
  id_pedido: number;
  mesa: Mesa;
  id_mesa: string;
  mesa_str: string;
  items: Array<Item>;
  private _total: number;
  codigo: string;
  llevar: boolean;
  fecha: Date;

  private _estado: string;


  constructor() {
    this.llevar = false;
    this.items = [];
  }

  toJson() {
    const final_items = [];
    for (const entry of this.items) {
      final_items.push(entry.toJson());
    }
    if (this.id_pedido != null) {
      return {id_pedido: this.id_pedido, mesa: this.mesa.id_mesa, items: final_items, llevar: this.llevar};
    } else {
      return {mesa: this.mesa.id_mesa, items: final_items, llevar: this.llevar};
    }
  }


  set total(value: number) {
    this._total = value;
  }

  get total(): number {
    let auxTotal: number = 0;
    for (const entry of this.items) {
      auxTotal += entry.subtotal;
    }
    return auxTotal.toFixed(2);
  }

  get estado(): string {
    const ESTADO_CHOICES = {
      P: 'PREPARANDO',
      L: 'PREPARADO',
      C: 'COMPLETO',
      G: 'PAGADO',
    };

    return ESTADO_CHOICES[this._estado];
  }

  set estado(value: string) {
    this._estado = value;
  }
}
