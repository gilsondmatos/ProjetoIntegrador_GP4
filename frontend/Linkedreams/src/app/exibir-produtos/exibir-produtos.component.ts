import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../Model/Produto';
import { User } from '../Model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-exibir-produtos',
  templateUrl: './exibir-produtos.component.html',
  styleUrls: ['./exibir-produtos.component.css']
})
export class ExibirProdutosComponent implements OnInit {

  produto: Produto = new Produto()
  idProduto: number
  listaProdutos: Produto[]

  user: User = new User()
  idUser = environment.id
  escreveON: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
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
    if (environment.tipo != 'ONG') {
      this.alertas.showAlertDanger('Você precisa ser uma ONG para ter acesso!')
      this.router.navigate(['/inicio'])
    }

    this.findByIdUser()

  }

  //funcao para escrever ativado/desatvado na lista de produtos
  analisaStatus(status: boolean) {
    if (status == true) {
      this.escreveON = "Ativado"
    } else {
      this.escreveON = "Desativado"
    }
    return this.escreveON
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  //enviar id do produto para o modal 
  enviarIdProduto(id: number) {
    this.idProduto = id
    this.findByIdProduto(this.idProduto)
  }
  //apagar produto usado no modal
  apagar() {
    this.produtoService.deleteProduto(this.idProduto).subscribe(() => {
      this.alertas.showAlertSuccess('Produto apagado com sucesso!')
      this.findByIdUser()
      this.router.navigate(['/exibirProdutos'])
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
