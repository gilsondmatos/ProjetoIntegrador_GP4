import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/Model/UserLogin';

import { AuthService } from 'src/app/service/auth.service';
import { CommunicationService } from 'src/app/service/communication.service';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../../Model/Produto';
import { AlertasService } from '../../service/alertas.service';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  listaProdutos: Produto[]
  nomeProduto: string
  causaProduto:string
  userLogin: UserLogin = new UserLogin()
  idProduto:number

  constructor(
    private communicationService: CommunicationService,
    private produtoService:ProdutoService,
    private router: Router,
    private alertas: AlertasService,
    public authService: AuthService,
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.getAllProdutos() 
    
  }

  callMethod  () {
    this.communicationService.callComponentMethod();
  }

  comprar(id:number){
    if(environment.token == ''){
       ($('#modal-login-2') as any).modal('show');
        this.idProduto=id  
    }
    else{
      this.router.navigate(['/pagamento',id])
    }
  }

  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos=resp
    })
  }

  findByNomeProduto(){
   if(this.nomeProduto==''){
      this.getAllProdutos()
    }else{
      this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp: Produto[])=>{
        this.listaProdutos = resp
      })
    }
  }
  
  findByCausaProduto(){
    if(this.causaProduto==''){
       this.getAllProdutos()
     }else{
       this.produtoService.getByCausaProduto(this.causaProduto).subscribe((resp: Produto[])=>{
         this.listaProdutos = resp
       })
     }
   }

   
   entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.id = this.userLogin.id
      environment.token = this.userLogin.token
      environment.nome_completo = this.userLogin.nome_completo
      environment.tipo = this.userLogin.tipo
      environment.load=true
      
      this.callMethod  ()
      
      this.router.navigate(['/pagamento',this.idProduto])
    }, error => {
      if (error.status == 500) {
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos')
      }
    })
  }
}
