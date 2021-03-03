import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Categoria } from 'src/app/Model/Categoria';
import { Produto } from 'src/app/Model/Produto';
import { User } from 'src/app/Model/User';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {
  
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

  ngOnInit(){
    window.scroll(0,0)
 
    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }

  }

  findByCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=>{
    this.categoria= resp
    }) 
  }
  

}
