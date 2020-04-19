import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {PedidosManageComponent} from './component/pedidos-manage/pedidos-manage.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PedidosListComponent} from './component/pedidos-list/pedidos-list.component';
import {CocinaListComponent} from './component/cocina-list/cocina-list.component';
import {CajaManageComponent} from './component/caja-manage/caja-manage.component';

const appRoutes: Routes = [
  // TODO redirect to pedidos
  {path: 'pedido', component: PedidosManageComponent},
  {path: 'pedido/:idPedido', component: PedidosManageComponent},
  {path: 'pedidos', component: PedidosListComponent},
  {path: 'cocina', component: CocinaListComponent},
  {path: 'caja', component: CajaManageComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    PedidosManageComponent,
    PedidosListComponent,
    CocinaListComponent,
    CajaManageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
