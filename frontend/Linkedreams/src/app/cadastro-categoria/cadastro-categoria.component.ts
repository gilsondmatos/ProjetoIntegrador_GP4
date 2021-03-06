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


@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent implements OnInit {
  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  produto: Produto = new Produto()
  status: boolean

  user: User = new User()
  idUser = environment.id

  constructor(
    public authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    //Toggle Click Function
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }
    if (environment.tipo != 'adm') {
      this.alertas.showAlertDanger('Você precisa ser um administrador para ter acesso!')
      this.router.navigate(['/inicio'])
    }

    this.findAllCategorias()

  }

  findAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  findByCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  cadastrar() {
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp
      this.alertas.showAlertSuccess('Categoria cadastrada com sucesso!')
      this.categoria = new Categoria()
      this.findAllCategorias()
      this.router.navigate(['/exibirCategorias'])
    }, error => {
      if (error.status == 500) {
        this.alertas.showAlertDanger('Preencha todos os campos!')
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


}