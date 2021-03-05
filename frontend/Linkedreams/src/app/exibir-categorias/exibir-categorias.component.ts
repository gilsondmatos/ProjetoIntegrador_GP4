import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../Model/Categoria';
import { User } from '../Model/User';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';


@Component({
  selector: 'app-exibir-categorias',
  templateUrl: './exibir-categorias.component.html',
  styleUrls: ['./exibir-categorias.component.css']
})
export class ExibirCategoriasComponent implements OnInit {

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number


  user: User = new User()
  idUser= environment.id
  escreveON: string

  constructor(
    private router: Router,
    private alertas: AlertasService,
    private categoriaService: CategoriaService,

  ) { }

  ngOnInit() {
    window.scroll(0,0)
     //Toggle Click Function
     $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

 

    this.findAllCategorias()
          
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
  enviarIdCategoria(id: number){
    this.idCategoria=id
    this.findByCategoria(this.idCategoria)
  }
  //apagar produto usado no modal
  apagar(){
    this.categoriaService.deleteCategoria(this.idCategoria).subscribe(()=>{
      this.alertas.showAlertSuccess('Categoria apagada com sucesso!')
     
      this.findAllCategorias()
      this.router.navigate(['/exibirCategorias'])
    })
  }


  sair() {
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.nome_completo = ''
    environment.tipo = ''
    environment.id = 0
  }

}