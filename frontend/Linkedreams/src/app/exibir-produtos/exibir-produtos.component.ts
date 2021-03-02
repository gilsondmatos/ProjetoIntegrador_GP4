import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-exibir-produtos',
  templateUrl: './exibir-produtos.component.html',
  styleUrls: ['./exibir-produtos.component.css']
})
export class ExibirProdutosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0,0)
     //Toggle Click Function
     $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

}
