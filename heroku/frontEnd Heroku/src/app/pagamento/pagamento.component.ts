import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../Model/Produto';
import { User } from '../Model/User';
import { AlertasService } from '../service/alertas.service';
import { ProdutoService } from '../service/produto.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {


  produto: Produto = new Produto()
  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }
    let id = this.route.snapshot.params['id']
  
    this.findByIdProduto(id)
    this.findByIdUser()
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
  analisaDoacao(){
    let ok :boolean =false

    if(this.produto.categoria.nome=='Doacão'){
     ok=true
    }
    return ok
  }
  Comprar(){
    this.alertas.showAlertSuccess('Compra realizada com sucesso!')
    this.router.navigate(['/inicio'])
  }
}
