import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../Model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogin: UserLogin=new UserLogin()
  constructor(
    public authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }
  
  direcionaMenu(){
    if(environment.tipo=='ONG'){
      this.router.navigate(["/cadastroProduto"])
    }else if(environment.tipo=='adm'){
      this.router.navigate(["/cadastroCategoria"])
    }else{
      this.router.navigate(["/listaProdutos"])
    }
  }
  sair() {
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.nome_completo = ''
    environment.tipo = ''
    environment.id = 0
  }
  entrar(){
    this.authService.entrar(this.userLogin).subscribe((resp:UserLogin)=>{
      this.userLogin=resp
      
      environment.id=this.userLogin.id
      environment.token=this.userLogin.token
      environment.nome_completo=this.userLogin.nome_completo
      environment.tipo=this.userLogin.tipo

      if(environment.tipo=='ONG'){
        this.router.navigate(["/cadastroProduto"])
      }else if(environment.tipo=='adm'){
        this.router.navigate(["/cadastroCategoria"])
      }else{
        this.router.navigate(["/listaProdutos"])
      }
      
    },error=>{
      if(error.status==500){
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos')
      }
    })
  }
}