import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Producto} from '../model/producto';
import {Categoria} from '../model/categoria';
import {Mesa} from '../model/mesa';
import {Pedido} from '../model/pedido';
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

  constructor(private http: HttpClient) {
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


  postPedido(pedido: Pedido): Observable<Pedido> {
    console.log('json ', pedido.toJson());
    const url = `${this.baseURL}/api/pedido/nuevo`;
    return this.http.post<Pedido>(url, pedido.toJson(), httpOptions);
  }

  postChangePedido(idPedido: number, estado: string): Observable<Pedido> {
    const url = `${this.baseURL}/api/pedido/estado/${idPedido}/${estado}`;
    return this.http.post<Pedido>(url, httpOptions);
  }

  deletePedido(idPedido: number): Observable<Pedido> {
    const url = `${this.baseURL}/api/pedido/${idPedido}`;
    return this.http.delete<Pedido>(url);
  }

  getPedidosPrep(): Observable<Pedido[]> {
    const url = `${this.baseURL}/api/pedido/preparando`;
    return this.http.get(url, httpOptions).pipe(map(res => {
        // console.log(res);
        return res['pedidos'].map(item => {
          const pedidoAux = new Pedido();
          pedidoAux.mesa_str = item.mesa__mesa;
          pedidoAux.codigo = item.codigo;
          pedidoAux.id_pedido = item.id_pedido;
          pedidoAux.estado = item.estado;
          pedidoAux.llevar = item.llevar;
          pedidoAux.fecha = new Date(item.fecha);
          return pedidoAux;

        });
      }
    ));
  }

  getPedidosEstado(estado: string): Observable<Pedido[]> {
    const url = `${this.baseURL}/api/pedido/estado/${estado}`;
    return this.http.get(url, httpOptions).pipe(map(res => {
        // console.log(res);
        return res['pedidos'].map(item => {
          const items = item['items'].map(itemProd => {
            const auxItem = new Item();
            auxItem.nombre = itemProd.producto;
            auxItem.precio = itemProd.precio;
            auxItem.cantidad = itemProd.cantidad;
            auxItem.llevar = itemProd.llevar;
            auxItem.id_pedido = item.id_pedido;
            if ('especificacion' in itemProd) {
              auxItem.especificacion = itemProd.especificacion;
            }
            if ('id_item' in itemProd) {
              auxItem.id_item = itemProd.id_item;
            }
            return auxItem;
          });

          const pedidoAux = new Pedido();
          pedidoAux.codigo = item.codigo;
          pedidoAux.id_pedido = item.id_pedido;
          pedidoAux.estado = item.estado;
          pedidoAux.llevar = item.llevar;
          pedidoAux.items = items;
          pedidoAux.mesa_str = item.mesa;
          pedidoAux.fecha = new Date(item.fecha);

          return pedidoAux;

        });
      }
    ));
  }

  getPedido(idPedido: number): Observable<Pedido> {
    const url = `${this.baseURL}/api/pedido/${idPedido}`;
    return this.http.get<Pedido>(url, httpOptions).pipe(map(res => {
        // console.log(res);
        const items = res['pedido']['items'].map(itemProd => {
          const auxItem = new Item();
          auxItem.id_producto = itemProd.producto;
          auxItem.nombre = itemProd.nombre;
          auxItem.precio = itemProd.precio;
          auxItem.cantidad = itemProd.cantidad;
          auxItem.llevar = itemProd.llevar;
          if ('especificacion' in itemProd) {
            auxItem.especificacion = itemProd.especificacion;
          }
          return auxItem;
        });
        const auxPedido = new Pedido();
        auxPedido.id_pedido = res['pedido'].id_pedido;
        if ('mesa' in res['pedido']) {
          auxPedido.id_mesa = res['pedido'].mesa;
        }
        auxPedido.codigo = res['pedido'].codigo;
        auxPedido.llevar = res['pedido'].llevar;
        auxPedido.fecha = res['pedido'].fecha;
        auxPedido.estado = res['pedido'].estado;
        auxPedido.total = res['pedido'].total;
        auxPedido.items = items;
        return auxPedido;
      }
    ));
  }
}
