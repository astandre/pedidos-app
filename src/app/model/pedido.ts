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
  user: string;

  private _estado: string;


  constructor() {
    this.llevar = false;
    this.items = [];
    this.user = '';
  }

  toJson() {
    const final_items = [];
    for (const entry of this.items) {
      final_items.push(entry.toJson());
    }
    const auxJSON = {
      items: final_items, llevar: this.llevar, estado: this._estado, user: this.user
    };
    if (this.id_pedido != null) {
      auxJSON['id_pedido'] = this.id_pedido;
    }
    if (this.mesa != null) {
      auxJSON['mesa'] = this.mesa.id_mesa;
    }
    return auxJSON;
  }


  set total(value: number) {
    this._total = value;
  }

  get total(): number {
    let auxTotal: number = 0;
    for (const entry of this.items) {
      auxTotal += entry.subtotal;
    }
    return auxTotal;
  }

  get estado(): string {
    const ESTADO_CHOICES = {
      P: 'PREPARANDO',
      C: 'PREPARADO',
      S: 'SERVIDO',
      G: 'PAGADO',
    };

    return ESTADO_CHOICES[this._estado];
  }

  set estado(value: string) {
    this._estado = value;
  }
}
