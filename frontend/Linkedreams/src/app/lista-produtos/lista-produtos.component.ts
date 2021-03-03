import { Component, OnInit } from '@angular/core';
import { Produto } from '../Model/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  listaProdutos: Produto[]

  constructor(
    private produtoService:ProdutoService,
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
}
