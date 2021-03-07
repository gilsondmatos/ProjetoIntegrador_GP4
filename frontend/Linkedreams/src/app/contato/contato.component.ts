import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
    private alertas: AlertasService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  enviar(){
    this.alertas.showAlertSuccess('Menssagem enviada com sucesso!')
    this.router.navigate(['/inicio'])
  }
}
