import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/Model/Categoria';
import { Produto } from 'src/app/Model/Produto';
import { AlertasService } from 'src/app/service/alertas.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  produto: Produto = new Produto()

  categoria: Categoria=new Categoria()
  idCategoria: number
  listaCategorias : Categoria[]
  
  status: boolean

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
 
    // if (environment.token == '') {
    //   this.router.navigate(['/inicio'])
    // }
    // if(environment.tipo != 'ONG'){
    //   alert ('Você precisa ser uma ONG para acessar essa rota')
    //   this.router.navigate(['/inicio'])
    // }

    let id=this.route.snapshot.params['id']
    this.findByCategoria(id)

  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
    this.listaCategorias= resp
    }) 
  }
  findByCategoria(id:number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
    this.categoria= resp
    }) 
  }

 

  atualizar(){
    
    this.categoriaService.putCategoria(this.categoria).subscribe((resp: Categoria)=>{
      this.categoria=resp
      this.alertas.showAlertSuccess('Categoria atualizada com sucesso!')
      this.router.navigate(['/exibirCategorias'])
    })
  }

}