import {Mesa} from './mesa';
import {Item} from './item';

export class Pedido {
  id_pedido: number;
  mesa: Mesa;
  mesa_str: string;
  items: Array<Item>;
  total: number;
  codigo: string;
  llevar: boolean;
  fecha: Date;

  private _estado: string;

  toJson() {
    const final_items = [];
    for (const entry of this.items) {
      final_items.push(entry.toJson());
    }
    return {mesa: this.mesa.id_mesa, items: final_items};
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
