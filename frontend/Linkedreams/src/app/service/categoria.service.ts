import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../Model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllCategoria(): Observable <Categoria[]>{
    return this.http.get<Categoria[]>('http://localhost:8080/categorias', this.token)
  }

  postCategoria(categoria: Categoria): Observable <Categoria>{
    return this.http.post<Categoria>('http://localhost:8080/categorias', categoria, this.token)
  }

  getByIdCategoria(id: number): Observable <Categoria>{
    return this.http.get<Categoria>(`http://localhost:8080/categorias/${id}`, this.token)
  }


}