import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../Model/Categoria';
import { Produto } from '../Model/Produto';
import { User } from '../Model/User';
import { AuthService } from '../service/auth.service';
import { AlertasService } from '../service/alertas.service';
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
    public authService:AuthService,
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private alertas: AlertasService
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
    // if(environment.tipo != 'ONG' ){
    //   alert ('Você precisa ser uma ONG para acessar essa rota')
    //   this.router.navigate(['/inicio'])
    // }
  
    
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
    this.alertas.showAlertSuccess('Categoria cadastrada com sucesso!') 
    this.categoria=new Categoria()
    this.findAllCategorias()
    this.router.navigate(['/cadastroProduto'])
  },error=>{
    if(error.status==500){
      this.alertas.showAlertDanger('Preencha todos os campos')
    }
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
    console.log(this.idCategoria)

    this.produto.status=this.status
    
    this.categoria.id=this.idCategoria
    this.produto.categoria=this.categoria

    this.user.id=this.idUser
    this.produto.usuario=this.user
    
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=>{
    this.produto=resp
    this.alertas.showAlertSuccess('Produto cadastrado com sucesso!')
    this.produto= new Produto()  
    this.router.navigate(['/exibirProdutos'])
    })


  }

}

