import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';

import { ContatoComponent } from './contato/contato.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';

import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { ExibirCategoriasComponent } from './exibir-categorias/exibir-categorias.component';
import { ExibirProdutosComponent } from './exibir-produtos/exibir-produtos.component';

import { InicioComponent } from './inicio/inicio.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { OngComponent } from './ong/ong.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { ProdutosByCategoriaComponent } from './produtos-by-categoria/produtos-by-categoria.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'faca-parte', component: OngComponent },
  { path: 'cadastroProduto', component: CadastroProdutoComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'exibirProdutos', component: ExibirProdutosComponent },
  { path: 'listaProdutos', component: ListaProdutosComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'exibirProdutos', component: ExibirProdutosComponent },
  { path: 'produto-edit/:id', component: ProdutoEditComponent },
  { path: 'produtoByCategoria/:id', component: ProdutosByCategoriaComponent },
  { path: 'cadastroCategoria', component: CadastroCategoriaComponent },
  { path: 'exibirCategorias', component: ExibirCategoriasComponent },
  { path: 'categoria-edit/:id', component: CategoriaEditComponent },
  { path: 'pagamento/:id', component: PagamentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
