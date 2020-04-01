import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PedidosManageComponent} from './component/pedidos-manage/pedidos-manage.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PedidosListComponent} from './component/pedidos-list/pedidos-list.component';

const appRoutes: Routes = [
  {path: 'pedido', component: PedidosManageComponent},
  {path: 'pedido/:idPedido', component: PedidosManageComponent},
  {path: 'pedidos', component: PedidosListComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    PedidosManageComponent,
    PedidosListComponent
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
