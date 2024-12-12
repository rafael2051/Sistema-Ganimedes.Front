import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private _url = 'http://localhost:5000/perfil';

  constructor(private http: HttpClient) {}

  public salvarPerfil(perfil: any) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${this._url}/atualizarPerfil`, perfil, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
