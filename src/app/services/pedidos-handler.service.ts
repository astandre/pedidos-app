import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Producto} from '../model/producto';
import {Categoria} from '../model/categoria';
import {Mesa} from '../model/mesa';

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
              itemProd.idProducto,
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
          item.idMesa,
          item.codigo,
          item.mesa,
        );
      });

    }));

  }
}
