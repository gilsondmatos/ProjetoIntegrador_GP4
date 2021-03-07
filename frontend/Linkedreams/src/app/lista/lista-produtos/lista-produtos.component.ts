import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../../Model/Produto';
import { AlertasService } from '../../service/alertas.service';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  listaProdutos: Produto[]
  nomeProduto: string
  causaProduto:string

  constructor(
    private produtoService:ProdutoService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.getAllProdutos() 
  }

  
  comprar(id:number){
    if(environment.token == ''){
       this.alertas.showAlertDanger('Você precisa estar logado para finalizar a compra!')
    }
    else{
  
      this.router.navigate(['/pagamento',id])
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
  
  findByCausaProduto(){
    if(this.causaProduto==''){
       this.getAllProdutos()
     }else{
       this.produtoService.getByCausaProduto(this.causaProduto).subscribe((resp: Produto[])=>{
         this.listaProdutos = resp
       })
     }
   }
}
