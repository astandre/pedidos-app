import {Component, OnInit} from '@angular/core';
import {Mesa} from '../../model/mesa';
import {PedidosHandlerService} from '../../services/pedidos-handler.service';
import {Categoria} from '../../model/categoria';

@Component({
  selector: 'app-pedidos-manage',
  templateUrl: './pedidos-manage.component.html',
  styleUrls: ['./pedidos-manage.component.css']
})
export class PedidosManageComponent implements OnInit {

  categorias: Array<Categoria>;
  mesas: Array<Mesa>;

  constructor(private pedidosHandlerService: PedidosHandlerService) {
    this.pedidosHandlerService.getAllProductos().subscribe(data => {
        // console.log(data);
        this.categorias = data;
      },
      error => {
        console.log(error);
      });
    this.pedidosHandlerService.getAllMesas().subscribe(data => {
        // console.log(data);
        this.mesas = data;
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

}
