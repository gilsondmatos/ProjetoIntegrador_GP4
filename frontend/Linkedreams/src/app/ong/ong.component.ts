import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.component.html',
  styleUrls: ['./ong.component.css']
})
export class OngComponent implements OnInit {


  user: User=new User
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

  }

  confirmSenha(event: any){
    this.confirmarSenha=event.target.value
  }
  tipoUser(event: any){
    this.tipoUsuario=event.target.value
  }
  cadastrar(){
    this.user.tipo=this.tipoUsuario
    if(this.user.senha!=this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas nâo coincidem! ')
    }else{
      this.authService.cadastrar(this.user).subscribe((resp:User)=>{
        this.user=resp
        this.router.navigate(["/inicio"])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
      })
    }
  }
}
