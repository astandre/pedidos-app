import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Producto} from '../model/producto';
import {Categoria} from '../model/categoria';
import {Mesa} from '../model/mesa';
import {Pedido} from '../model/pedido';
import {ConfigService} from './config.service';
import {Item} from '../model/item';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PedidosHandlerService {
  baseURL = 'http://127.0.0.1:8000';
  configService;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.configService = configService;
  }

  getAllProductos(): Observable<Categoria[]> {
    const url = `${this.baseURL}/api/productos`;
    return this.http.get(url, httpOptions).pipe(map(res => {
        // console.log(res);
        return res['categorias'].map(item => {
          const localProductos = item.productos.map(itemProd => {
            return new Producto(
              itemProd.id_producto,
              itemProd.nombre,
              itemProd.descripcion,
              itemProd.disponible,
              itemProd.precio
            );
          });
          return new Categoria(
            item.id_categoria,
            item.nombre,
            localProductos
          );
        });
      }
    ));
  }

  getAllMesas(): Observable<Mesa[]> {
    const url = `${this.baseURL}/api/mesas`;
    return this.http.get(url, httpOptions).pipe(map(res => {
      // console.log(res);
      return res['mesas'].map(item => {
        return new Mesa(
          item.id_mesa,
          item.codigo,
          item.mesa,
        );
      });
    }));

  }

  postPrevPedido(pedido: Pedido): Observable<Pedido> {
    console.log('json ', pedido.toJson());
    const url = `${this.baseURL}/api/pedido/resumen`;
    return this.http.post<Pedido>(url, pedido.toJson(), httpOptions).pipe(map(res => {
      // console.log(res);
      const localProductos = res['productos'].map(itemProd => {
        const auxItem = new Item();
        auxItem.nombre = itemProd.nombre;
        auxItem.precio = itemProd.precio;
        auxItem.cantidad = itemProd.cantidad;
        auxItem.subtotal = itemProd.subtotal;
        if ('especificacion' in itemProd) {
          auxItem.especificacion = itemProd.especificacion;
        }
        return auxItem;
      });
      const auxPedido = new Pedido();
      auxPedido.total = res.total;
      auxPedido.items = localProductos;
      return auxPedido;
    }));
  }

  postPedido(pedido: Pedido): Observable<Pedido> {
    console.log('json ', pedido.toJson());
    const url = `${this.baseURL}/api/pedido/nuevo`;
    return this.http.post<Pedido>(url, pedido.toJson(), httpOptions);
  }
}
