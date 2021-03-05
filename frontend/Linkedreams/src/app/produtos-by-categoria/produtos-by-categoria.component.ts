import { Component, OnInit } from '@angular/core';
import { Categoria } from '../Model/Categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-produtos-by-categoria',
  templateUrl: './produtos-by-categoria.component.html',
  styleUrls: ['./produtos-by-categoria.component.css']
})
export class ProdutosByCategoriaComponent implements OnInit {

  categoria: Categoria

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    let id=this.route.snapshot.params['id']
    this.findByIdCategoria(id)
    
  }
  
  findByIdCategoria(id:number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
      this.categoria=resp
    })
  }
  
}
