import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../Model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>('https://linkedreams.herokuapp.com/produtos', this.token)
  }

  getByIdProduto(id: number): Observable<Produto>{
    return this.http.get<Produto>(`https://linkedreams.herokuapp.com/produtos/${id}`, this.token)
  }

  getByNomeProduto(nome: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`https://linkedreams.herokuapp.com/produtos/nome/${nome}`, this.token)
  }
  
  getByCausaProduto(causa: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`https://linkedreams.herokuapp.com/produtos/causa/${causa}`, this.token)
  }

  postProduto(produto: Produto) : Observable<Produto>{
    return this.http.post<Produto>('https://linkedreams.herokuapp.com/produtos', produto, this.token)
  }

  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('https://linkedreams.herokuapp.com/produtos', produto, this.token)
  }

  deleteProduto(id: number){
    return this.http.delete(`https://linkedreams.herokuapp.com/produtos/${id}`, this.token)
  }

}