import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private _url = 'http://localhost:5000/perfil';
  private _token = sessionStorage.getItem('token');

  constructor(private http: HttpClient) {}

  public salvarPerfil(perfil: any) {
    this.http.post(`${this._url}/atualizarPerfil`, perfil, {
      headers: { Authorization: `Bearer ${this._token}` },
    });
  }
}
