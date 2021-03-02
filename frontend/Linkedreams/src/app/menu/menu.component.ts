import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../Model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogin: UserLogin=new UserLogin()
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  entrar(){
    this.authService.entrar(this.userLogin).subscribe((resp:UserLogin)=>{
      this.userLogin=resp
      
      environment.id=this.userLogin.id
      environment.token=this.userLogin.token
      environment.nome_completo=this.userLogin.nome_completo
      environment.tipo=this.userLogin.tipo

      console.log(environment.tipo)

      console.log(environment.token)

      this.router.navigate(["/cadastroProduto"])
    },error=>{
      if(error.status==500){
        alert('Usuário ou senha estão incorretos')
      }
    })
  }
}
