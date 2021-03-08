import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../Model/Categoria';
import { ActivatedRoute,  Router } from '@angular/router';
import { CategoriaService } from '../../service/categoria.service';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../../service/alertas.service';

@Component({
  selector: 'app-produtos-by-categoria',
  templateUrl: './produtos-by-categoria.component.html',
  styleUrls: ['./produtos-by-categoria.component.css']
})
export class ProdutosByCategoriaComponent implements OnInit {

  categoria: Categoria

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

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
  
  comprar(id:number){
    if(environment.token == ''){
       this.alertas.showAlertDanger('Você precisa estar logado para finalizar a compra!')
    }
    else{
  
      this.router.navigate(['/pagamento',id])
    }
  }
}
