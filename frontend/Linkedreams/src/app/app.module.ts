import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { OngComponent } from './ong/ong.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { CestaComprasComponent } from './cesta-compras/cesta-compras.component';
import { RodapeComponent } from './rodape/rodape.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ContatoComponent } from './contato/contato.component';

import { QuemSomosComponent } from './quem-somos/quem-somos.component';


import { ExibirProdutosComponent } from './exibir-produtos/exibir-produtos.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { LoginEntrarComponent } from './login-entrar/login-entrar.component';

import { ProdutosByCategoriaComponent } from './produtos-by-categoria/produtos-by-categoria.component';

import { AlertasComponent } from './alertas/alertas.component';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    InicioComponent,
    PagamentoComponent,
    CestaComprasComponent,
    OngComponent,
    CadastroProdutoComponent,
    ContatoComponent,
    QuemSomosComponent,
    ListaProdutosComponent,
    ContatoComponent,
    ExibirProdutosComponent,
    ProdutoEditComponent,
    LoginEntrarComponent,
    cardsProduto,
    ProdutosByCategoriaComponent,
    AlertasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
