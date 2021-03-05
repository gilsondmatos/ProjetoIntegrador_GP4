import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/Model/Categoria';
import { Produto } from 'src/app/Model/Produto';
import { User } from 'src/app/Model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {
  
  produto: Produto = new Produto()

  categoria: Categoria=new Categoria()
  idCategoria: number
  listaCategorias : Categoria[]
  
  status: boolean

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
 
    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }
    if(environment.tipo != 'ONG'){
      this.alertas.showAlertDanger('Você precisa ser uma ONG para acessar essa rota')
      this.router.navigate(['/inicio'])
    }

    let id=this.route.snapshot.params['id']
    this.findByIdProduto(id)
    this.findAllCategorias()
  }

  findByIdProduto(id:number){
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto=resp
    })
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

  tipoStatus(event: any){
    this.status=event.target.value
  }

  atualizar(){
    this.produto.status=this.status
    
    this.categoria.id=this.idCategoria
    this.produto.categoria=this.categoria

    this.produtoService.putProduto(this.produto).subscribe((resp: Produto)=>{
      this.produto=resp
      this.alertas.showAlertSuccess('Produto atualizado com sucesso!')
      this.router.navigate(['/exibirProdutos'])
    })
  }

}
