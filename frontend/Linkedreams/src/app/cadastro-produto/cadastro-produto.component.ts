import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../Model/Categoria';
import { Produto } from '../Model/Produto';
import { User } from '../Model/User';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  produto: Produto = new Produto()
  status: boolean

  user: User = new User()
  idUser= environment.id

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
                //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }

    this.findAllCategorias()
          
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
    this.listaCategorias= resp
    }) 
  }

  findByCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=>{
    this.categoria= resp
    }) 
  }

  cadastrar(){
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=>{
    this.categoria=resp
    alert('Categoria cadastrada com sucesso!') 
    this.categoria=new Categoria()
    this.findAllCategorias()
    this.router.navigate(['/cadastroProduto'])
    }) 
  }

  sair() {
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.nome_completo = ''
    environment.tipo = ''
    environment.id = 0
  }

  tipoStatus(event: any){
    this.status=event.target.value
  }

  cadastrarProduto(){
    console.log(environment.id)
    console.log(this.produto.nome)
    console.log(this.produto.status)
    console.log(this.produto.causa)
    console.log(this.produto.descricao)
    console.log(this.produto.categoria)
    console.log(this.produto.usuario)
    console.log(this.produto.preco)

    this.produto.status=this.status
    this.categoria.id=this.idCategoria
    this.produto.categoria=this.categoria
    this.user.id=this.idUser
    this.produto.usuario=this.user
    
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=>{
    this.produto=resp
    alert ('Produto cadastrado com sucesso!')
    this.produto= new Produto()  
    this.router.navigate(['/listaProdutos'])
    })


  }

}
