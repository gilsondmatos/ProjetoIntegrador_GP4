import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../Model/Categoria';
import { ActivatedRoute,  Router } from '@angular/router';
import { CategoriaService } from '../../service/categoria.service';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../../service/alertas.service';
import { CommunicationService } from 'src/app/service/communication.service';
import { UserLogin } from 'src/app/Model/UserLogin';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-produtos-by-categoria',
  templateUrl: './produtos-by-categoria.component.html',
  styleUrls: ['./produtos-by-categoria.component.css']
})
export class ProdutosByCategoriaComponent implements OnInit {

  categoria: Categoria
  idProduto:number
  userLogin: UserLogin = new UserLogin()

  constructor(
    private communicationService: CommunicationService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService,
    public authService: AuthService 
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit(){
    window.scroll(0,0)
    let id=this.route.snapshot.params['id']
    this.findByIdCategoria(id)
    this.router.url
  }
  
  findByIdCategoria(id:number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
      this.categoria=resp
    })
  }
  
  callMethod  () {
    this.communicationService.callComponentMethod();
  }

  comprar(id:number){
    if(environment.token == ''){
       ($('#modal-login-3') as any).modal('show');
        this.idProduto=id  
    }
    else{
      this.router.navigate(['/pagamento',id])
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
