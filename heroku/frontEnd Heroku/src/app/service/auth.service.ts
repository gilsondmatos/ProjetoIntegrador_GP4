
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../Model/User';
import { UserLogin } from '../Model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://linkedreams.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://linkedreams.herokuapp.com/usuarios/cadastrar', user)
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`https://linkedreams.herokuapp.com/usuarios/${id}`)
  }

  logado() {
    let ok: boolean = false

    if (environment.token != '') {
      ok = true
    }
    return ok
  }

  deslogado() {
    let ok: boolean = true

    if (environment.token != '') {
      ok = false
    }
    return ok
  }


  ong() {
    let ok: boolean = true

    if (environment.tipo == 'ONG') {
      ok = false
    }
    return ok
  }
  analisaONG() {
    let ok: boolean = false

    if (environment.tipo == 'ONG') {
      ok = true
    }
    return ok
  }
  analisaADM() {
    let ok: boolean = false

    if (environment.tipo == 'adm') {
      ok = true
    }
    return ok
  }

}
