import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // O serviço será disponibilizado para toda a aplicação
})

export class UserService {
  // private readonly apiUrl = 'http://localhost:3000/';
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/';
  private readonly endpointUsuario = 'users/'; 

  constructor(private http: HttpClient) {}

  // Método para obter usuários
  obterUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${this.endpointUsuario}`);
  }

  // Método para editar um usuário
  editarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${this.endpointUsuario}${id}`, usuario);
  }

  // Método para excluir um usuário
  excluirUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${this.endpointUsuario}${id}`);
  }

  // Método para adicionar um novo usuário
  adicionarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.endpointUsuario}`, usuario);
  }
}
