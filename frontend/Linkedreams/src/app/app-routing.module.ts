import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { ExibirProdutosComponent } from './exibir-produtos/exibir-produtos.component';
import { InicioComponent } from './inicio/inicio.component';
import { OngComponent } from './ong/ong.component';

const routes: Routes = [
  {path:'',redirectTo:'inicio',pathMatch:'full'},
  {path:'inicio',component:InicioComponent},
  {path:'faca-parte',component:OngComponent},
  {path:'cadastroProduto',component:CadastroProdutoComponent},
  {path:'exibirProdutos',component:ExibirProdutosComponent},
  {path:'produto-edit',component:ProdutoEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
