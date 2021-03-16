import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  nome:string=''
  email:string=''
  mensagem:string=''

  constructor(
    private alertas: AlertasService,
    private router: Router
  ) { }


  ngOnInit() {
    window.scroll(0,0)
  }

  enviar(){
    if(this.email!='' && this.mensagem!='' && this.nome!=''){
      this.alertas.showAlertSuccess('Mensagem enviada com sucesso!')
      this.router.navigate(['/inicio'])
    }else{
      this.alertas.showAlertDanger('Verifique se todos os campos estão preenchidos!')
    }
  
  }
}
