import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
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
    private router: Router,
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.getAllProdutos() 
  }

  comprar(){
    if(environment.token == ''){
      alert ('Você precisa está logado para finalizar a compra')
    }
    else{
      this.router.navigate(['/inicio'])
    }
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
