import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../Model/Produto';
import { User } from '../Model/User';
import { AuthService } from '../service/auth.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-exibir-produtos',
  templateUrl: './exibir-produtos.component.html',
  styleUrls: ['./exibir-produtos.component.css']
})
export class ExibirProdutosComponent implements OnInit {
  
  listaProdutos : Produto []
  user: User = new User()
  idUser= environment.id
  escreveON: string

  constructor(
    private authService:AuthService,
    private router: Router
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

    this.findByIdUser()
    
  }

  analisaStatus(status: boolean){
    if(status==true){
      this.escreveON="Ativado"
    }else{
      this.escreveON="Desativado"
    }
    return this.escreveON
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

}
