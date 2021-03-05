import { Component, OnInit } from '@angular/core';
import { Categoria } from '../Model/Categoria';
import { Produto } from '../Model/Produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  listaProdutos: Produto[]
  nomeProduto: string

  constructor(
    private produtoService:ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.getAllProdutos() 
  }

  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos=resp
    })
  }

  findByNomeProduto(){
   if(this.nomeProduto==''){
      this.getAllProdutos()
    }else{
      this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp: Produto[])=>{
        this.listaProdutos = resp
      })
    }
  }
}
