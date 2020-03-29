import {Mesa} from './mesa';
import {Item} from './item';

export class Pedido {
  mesa: Mesa;
  items: Array<Item>;
  total: number;

  toJson() {
    const final_items = [];
    for (const entry of this.items) {
      final_items.push(entry.toJson());
    }

    return {mesa: this.mesa.id_mesa, items: final_items};
  }
}
